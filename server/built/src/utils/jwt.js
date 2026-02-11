var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import jwt from "jsonwebtoken";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env";
const signDefaults = {
    audience: ["user"],
};
const verifyDefaults = {
    audience: ["user"],
};
const accessTokenSignOptions = {
    expiresIn: "15m",
    secret: JWT_SECRET,
};
export const refreshTokenSignOptions = {
    expiresIn: "30d",
    secret: JWT_REFRESH_SECRET,
};
export const signToken = (payload, options) => {
    const _a = options || accessTokenSignOptions, { secret } = _a, signopts = __rest(_a, ["secret"]);
    return jwt.sign(payload, secret, Object.assign(Object.assign({}, signDefaults), signopts));
};
export const verifyToken = (token, options) => {
    const _a = options || {}, { secret = JWT_SECRET } = _a, verifyOpts = __rest(_a, ["secret"]);
    try {
        const payload = jwt.verify(token, secret, Object.assign(Object.assign({}, verifyDefaults), verifyOpts));
        return { payload };
    }
    catch (error) {
        return {
            error: error.message,
        };
    }
};
