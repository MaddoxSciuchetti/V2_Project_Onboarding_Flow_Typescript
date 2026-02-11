var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { z } from "zod";
import { NOT_FOUND, OK } from "../constants/http";
import catchErrors from "../utils/catchErrors";
import appAssert from "../utils/appAssert";
import { prisma } from "@/lib/prisma";
export const getSessionHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessions = yield prisma.session.findMany({
        where: {
            userId: req.userId,
            expiresAt: {
                gt: new Date(),
            },
        },
        select: {
            id: true,
            userAgent: true,
            createdAt: true,
        },
        orderBy: {
            createdAt: "desc",
        },
    });
    const session = sessions.map((session) => (Object.assign(Object.assign({}, session), (session.id === req.sessionId && {
        isCurrent: true,
    }))));
    console.log("this is the session", session);
    return res.status(OK).json(session);
}));
export const deleteSessionHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = z.string().parse(req.params.id);
    const deleted = yield prisma.session.delete({
        where: {
            id: sessionId,
            userId: req.userId,
        },
    });
    appAssert(deleted, NOT_FOUND, "Session not found");
    return res.status(OK).json({
        message: "Session removed",
    });
}));
