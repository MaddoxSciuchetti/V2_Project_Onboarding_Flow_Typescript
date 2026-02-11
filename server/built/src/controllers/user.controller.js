var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";
import { getChef, getemployee_form, getUser } from "../services/user.protected";
export const getUserHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const user = yield getUser(id);
    console.log("=== AUTHENTICATED USER ====");
    console.log(user);
    appAssert(user, NOT_FOUND, "User not found");
    return res.status(OK).json(user);
}));
export const getChefHandler = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const user = yield getChef(id);
    console.log(" === REAL USER ===");
    console.log(user);
    if ((user === null || user === void 0 ? void 0 : user.user_permission) !== "CHEF") {
        return res.status(OK).json({ error: "User not found" });
    }
    return res.status(OK).json(user);
}));
export const getEmployeedata = catchErrors((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    const user = yield getChef(id);
    if ((user === null || user === void 0 ? void 0 : user.user_permission) !== "CHEF") {
        return res.status(OK).json({ error: "User not found" });
    }
    console.log("is something happening");
    const { unifiedData } = yield getemployee_form();
    console.log(unifiedData);
    return res.status(OK).json(unifiedData);
}));
