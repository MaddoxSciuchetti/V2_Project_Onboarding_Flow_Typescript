import { UNAUTHORIZED } from "../constants/http";
import appAssert from "../utils/appAssert";
import { verifyToken } from "../utils/jwt";
const authenticate = (req, res, next) => {
    const accessToken = req.cookies.accessToken;
    appAssert(accessToken, UNAUTHORIZED, "Not authorized", "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    const { error, payload } = verifyToken(accessToken);
    appAssert(payload, UNAUTHORIZED, error === "jwt expired" ? "Token expired" : "Invalid token", "InvalidAccessToken" /* AppErrorCode.InvalidAccessToken */);
    req.userId = payload.userId;
    req.sessionId = payload.sessionId;
    next();
};
export default authenticate;
