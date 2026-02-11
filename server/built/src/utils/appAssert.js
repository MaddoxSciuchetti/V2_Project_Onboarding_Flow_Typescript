import assert from "node:assert";
import AppError from "./AppError";
const appAssert = (condition, HttpStatusCode, message, appErrorCode) => assert(condition, new AppError(HttpStatusCode, message, appErrorCode));
export default appAssert;
