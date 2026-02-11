var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import catchErrors from "../utils/catchErrors";
import { createAccount, loginUser, refreshUserAccessToken, resetPassword, sendPasswordResetEmail, verifyEmail, } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies, } from "../utils/cookies";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema, } from "./auth.Schemas";
import { verifyToken } from "../utils/jwt";
import appAssert from "../utils/appAssert";
import { prisma } from "@/lib/prisma";
export const registerHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate request
    const request = registerSchema.parse(Object.assign(Object.assign({}, req.body), { userAgent: req.headers["user-agent"] }));
    // call service
    const { user, accessToken, refreshToken } = yield createAccount(request);
    // return response
    return setAuthCookies({ res, accessToken, refreshToken })
        .status(CREATED)
        .json(user);
}));
export const loginHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate request
    const request = loginSchema.parse(Object.assign(Object.assign({}, req.body), { userAgent: req.headers["user-agent"] }));
    // call service
    const { accessToken, refreshToken } = yield loginUser(request);
    return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
        message: "Login sucessful",
    });
}));
export const logoutHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken || "");
    if (payload) {
        yield prisma.session.delete({
            where: {
                id: payload.sessionId,
            },
        });
    }
    return clearAuthCookies(res).status(OK).json({
        message: "Logout sucessfull",
    });
}));
export const refreshHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.cookies.refreshToken);
    const refreshToken = req.cookies.refreshToken;
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");
    const { accessToken, newRefreshToken } = yield refreshUserAccessToken(refreshToken);
    if (newRefreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions());
    }
    return res
        .status(OK)
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .json({
        message: "Access token refreshed",
    });
}));
export const verifyEmailHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.params.code);
    const verificationCode = verificationCodeSchema.parse(req.params.code);
    yield verifyEmail(verificationCode);
    return res.status(OK).json({
        message: "Email was sucessfully verified",
    });
}));
export const sendPasswordResetHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = emailSchema.parse(req.body.email);
    yield sendPasswordResetEmail(email);
    return res.status(OK).json({
        message: "Password reset email sent",
    });
}));
export const resetPasswordHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = resetPasswordSchema.parse(req.body);
    yield resetPassword(request);
    return clearAuthCookies(res)
        .status(OK)
        .json({ message: "Password was reset successfully" });
}));
