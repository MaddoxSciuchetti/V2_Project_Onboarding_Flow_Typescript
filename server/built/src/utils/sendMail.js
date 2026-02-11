var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import resend from "../config/resend";
import { EMAIL_SENDER, NODE_ENV } from "../constants/env";
const getFromEmail = () => NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;
const getToEmail = (to) => (NODE_ENV === "development" ? to : to);
export const sendMail = (_a) => __awaiter(void 0, [_a], void 0, function* ({ to, subject, text, html }) {
    return yield resend.emails.send({
        from: getFromEmail(),
        to: getToEmail(to),
        subject,
        text,
        html,
    });
});
