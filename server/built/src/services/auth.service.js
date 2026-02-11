var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { APP_ORIGIN } from "../constants/env";
import { CONFLICT, INTERNAL_SERVER_ERROR, NOT_FOUND, TOO_MANY_REQUESTS, UNAUTHORIZED, } from "../constants/http";
import appAssert from "../utils/appAssert";
import { fiveMinutesAgo, ONE_DAY_MS, oneHourFromNow, oneYearFromNow, thirtyDaysFromNow, } from "../utils/date";
import { refreshTokenSignOptions, signToken, verifyToken, } from "../utils/jwt";
import { getPasswordResetTemplate, getVerifyEmailTemplate, } from "../utils/emailTemplates";
import { sendMail } from "../utils/sendMail";
import { hashValue } from "../utils/bcrypt";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
export const createAccount = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //verify existing user does not exists
    const existingUser = yield prisma.user.findUnique({
        where: {
            email: data.email,
        },
    });
    appAssert(!existingUser, CONFLICT, "Email already in use");
    // create user
    const hashedpassword = yield hashValue(data.password);
    const user = yield prisma.user.create({
        data: {
            email: data.email,
            password: hashedpassword,
        },
        omit: {
            password: true,
        },
    });
    const userId = user.id;
    // create verification code
    const verificationCode = yield prisma.verificationCode.create({
        data: {
            userId,
            type: "email_verification" /* VerificationCodeType.EmailVerification */,
            expiresAt: oneYearFromNow(),
        },
    });
    // send the verification email
    const url = `${APP_ORIGIN}/email/verify/${verificationCode.id}`;
    const { error } = yield sendMail(Object.assign({ to: user.email }, getVerifyEmailTemplate(url)));
    if (error) {
        console.log(error);
    }
    // create the session
    const session = yield prisma.session.create({
        data: {
            userId,
            userAgent: data.userAgent,
        },
    });
    // sign the acess token and refresh token
    const refreshToken = signToken({
        sessionId: session.id,
    }, refreshTokenSignOptions);
    console.log(refreshToken);
    const accessToken = signToken({
        userId,
        sessionId: session.id,
    });
    console.log(accessToken);
    // return user & tokens
    return {
        user: user,
        accessToken,
        refreshToken,
    };
});
export const loginUser = (_a) => __awaiter(void 0, [_a], void 0, function* ({ email, password, userAgent, }) {
    // get the user by email
    const user = yield prisma.user.findUnique({
        where: {
            email: email,
        },
    });
    console.log(user);
    console.log(user === null || user === void 0 ? void 0 : user.password);
    appAssert(user, UNAUTHORIZED, "Invalid email or password");
    const isinValid = yield bcrypt.compare(password, user.password);
    appAssert(isinValid, UNAUTHORIZED, "Invalid password");
    const userId = user.id;
    const session = yield prisma.session.create({
        data: {
            userId: userId,
            userAgent: userAgent,
        },
    });
    const sessionInfo = {
        sessionId: session.id,
    };
    // sign access token & refresh token
    const refreshToken = signToken(sessionInfo, refreshTokenSignOptions);
    const accessToken = signToken(Object.assign(Object.assign({}, sessionInfo), { userId }));
    // return user & tokens
    return {
        user: user,
        accessToken,
        refreshToken,
    };
});
export const refreshUserAccessToken = (refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const { payload } = verifyToken(refreshToken, {
        secret: refreshTokenSignOptions.secret,
    });
    console.log(payload);
    appAssert(payload, UNAUTHORIZED, "Invalid refresh token");
    const session = yield prisma.session.findUnique({
        where: {
            id: payload.sessionId,
        },
    });
    const now = Date.now();
    appAssert(session && session.expiresAt.getTime() > now, UNAUTHORIZED, "Session expired");
    // refresh the session if it expires in the next 24 hours
    const sessionNeedsRefresh = session.expiresAt.getTime() - now <= ONE_DAY_MS;
    if (sessionNeedsRefresh) {
        yield prisma.session.update({
            where: { id: session.id },
            data: {
                expiresAt: thirtyDaysFromNow(),
            },
        });
    }
    const newRefreshToken = sessionNeedsRefresh
        ? signToken({
            sessionId: session.id,
        }, refreshTokenSignOptions)
        : undefined;
    const accessToken = signToken({
        userId: session.userId,
        sessionId: session.id,
    });
    return {
        accessToken,
        newRefreshToken,
    };
});
export const verifyEmail = (code) => __awaiter(void 0, void 0, void 0, function* () {
    const validCode = yield prisma.verificationCode.findFirst({
        where: {
            id: code,
            type: "email_verification" /* VerificationCodeType.EmailVerification */,
            expiresAt: { gt: new Date() },
        },
    });
    appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
    const updatedUser = yield prisma.user.update({
        where: {
            id: validCode.userId,
        },
        data: {
            verified: true,
        },
        omit: {
            password: true,
        },
    });
    appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to verify email");
    yield prisma.verificationCode.delete({
        where: {
            id: validCode.id,
        },
    });
    return {
        user: updatedUser,
    };
});
export const sendPasswordResetEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findFirst({
        where: {
            email: email,
        },
    });
    appAssert(user, NOT_FOUND, "User not found");
    // check for max password reset requests (2 emails in 5 min)
    const fiveMinAgo = fiveMinutesAgo();
    const count = yield prisma.verificationCode.count({
        where: {
            userId: user.id,
            type: "password_reset" /* VerificationCodeType.PasswordReset */,
            createdAt: { gt: fiveMinAgo },
        },
    });
    appAssert(count <= 1, TOO_MANY_REQUESTS, "To many request, please try again later");
    // create verification code
    const expiresAt = oneHourFromNow();
    const verificationCode = yield prisma.verificationCode.create({
        data: {
            userId: user.id,
            type: "password_reset" /* VerificationCodeType.PasswordReset */,
            expiresAt: expiresAt,
        },
    });
    // send verifcation email
    const url = `${APP_ORIGIN}/password/reset?code=${verificationCode.id}&exp=${expiresAt.getTime()}`;
    const { data, error } = yield sendMail(Object.assign({ to: email }, getPasswordResetTemplate(url)));
    appAssert(data === null || data === void 0 ? void 0 : data.id, INTERNAL_SERVER_ERROR, `${error === null || error === void 0 ? void 0 : error.name} - ${error === null || error === void 0 ? void 0 : error.message}`);
    // return success
    return {
        url,
        emailId: data.id,
    };
});
export const resetPassword = (_a) => __awaiter(void 0, [_a], void 0, function* ({ password, verificationCode, }) {
    const validCode = yield prisma.verificationCode.findUnique({
        where: {
            id: verificationCode,
            type: "password_reset" /* VerificationCodeType.PasswordReset */,
            expiresAt: { gt: new Date() },
        },
    });
    appAssert(validCode, NOT_FOUND, "Invalid or expired verification code");
    // get the verication
    const updatedUser = yield prisma.user.update({
        where: {
            id: validCode.userId,
        },
        data: {
            password: yield hashValue(password),
        },
        omit: {
            password: true,
        },
    });
    appAssert(updatedUser, INTERNAL_SERVER_ERROR, "Failed to reset password");
    // delete code
    yield prisma.verificationCode.delete({
        where: {
            id: validCode.id,
        },
    });
    yield prisma.session.deleteMany({
        where: {
            userId: updatedUser.id,
        },
    });
    return { user: updatedUser };
});
