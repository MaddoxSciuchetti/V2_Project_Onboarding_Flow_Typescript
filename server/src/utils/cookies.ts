import { Response, CookieOptions } from "express";
import { fifteenMinutesFromNow, thirtyDaysFromNow } from "./date";

export const REFRESH_PATH = "/auth/refresh";
const secure = process.env.NODE_ENV !== "development";
const isProd = process.env.NODE_ENV === "production";

const defaults: CookieOptions = {
    sameSite: isProd ? "none" : "lax",
    httpOnly: true,
    secure: isProd,
};

export const getAccessTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: fifteenMinutesFromNow(),
});

export const getRefreshTokenCookieOptions = (): CookieOptions => ({
    ...defaults,
    expires: thirtyDaysFromNow(),
    path: REFRESH_PATH,
});

type Params = {
    res: Response;
    accessToken: string;
    refreshToken: string;
};

export const setAuthCookies = ({ res, accessToken, refreshToken }: Params) =>
    res
        .cookie("accessToken", accessToken, getAccessTokenCookieOptions())
        .cookie("refreshToken", refreshToken, getRefreshTokenCookieOptions());

export const clearAuthCookies = (res: Response) =>
    res.clearCookie("accessToken").clearCookie("refreshToken", {
        path: REFRESH_PATH,
    });
