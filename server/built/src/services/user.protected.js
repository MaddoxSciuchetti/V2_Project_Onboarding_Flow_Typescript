var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { prisma } from "@/lib/prisma";
export const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: id,
        },
        omit: {
            password: true,
        },
    });
    return user;
});
export const getChef = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield prisma.user.findUnique({
        where: {
            id: id,
        },
        omit: {
            password: true,
        },
    });
    return user;
});
export const getemployee_form = () => __awaiter(void 0, void 0, void 0, function* () {
    const onboarding_forms = yield prisma.form_fields.findMany({
        where: {
            owner: {
                in: ["Janik", "Siemon", "Acosta", "Sen", "Conpro IT"],
            },
        },
        select: {
            form_field_id: true,
            description: true,
            owner: true,
        },
        orderBy: {
            form_field_id: "asc",
        },
    });
    const employee_forms = yield prisma.form_inputs.findMany({
        select: {
            id: true,
            employee_form_id: true,
            form_field_id: true,
            status: true,
            timestamp: true,
            employee_forms: {
                select: {
                    user_id: true,
                    users: {
                        select: {
                            id: true,
                            vorname: true,
                            nachname: true,
                            email: true,
                        },
                    },
                },
            },
        },
    });
    const individual_worker = yield prisma.users.findMany({});
    const unifiedData = onboarding_forms.map((form_field) => ({
        form_field_id: form_field.form_field_id,
        description: form_field.description,
        owner: form_field.owner,
        inputs: employee_forms
            .filter((input) => input.form_field_id === form_field.form_field_id)
            .map((input) => ({
            id: input.id,
            employee_form_id: input.employee_form_id,
            form_field_id: input.form_field_id,
            status: input.status,
            timestamp: input.timestamp,
            employee: input.employee_forms.users,
        })),
    }));
    console.log("UNIFIED DATA");
    console.log(JSON.stringify(unifiedData, null, 2));
    console.log(unifiedData);
    return { unifiedData };
});
