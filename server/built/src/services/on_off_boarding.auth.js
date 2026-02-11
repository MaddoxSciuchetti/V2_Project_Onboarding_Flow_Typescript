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
import { datevalidation } from "@/src/utils/datevalidation";
import { sendMail } from "../utils/sendMail";
import appAssert from "../utils/appAssert";
import { INTERNAL_SERVER_ERROR } from "../constants/http";
import { getFormReminderTemplate } from "../utils/emailTemplates";
const FORM_INPUTS_ONBOARDING = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
];
const FORM_INPUTS_OFFBOARDING = [
    18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
export const createUser = (data) => {
    return prisma.$transaction((tx) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield tx.users.create({
            data: {
                vorname: data.vorname,
                nachname: data.nachname,
                email: data.email,
                geburtsdatum: datevalidation(data.geburtsdatum),
                adresse: data.adresse,
                eintrittsdatum: datevalidation(data.eintrittsdatum),
                position: data.position,
            },
            select: {
                id: true,
                vorname: true,
                nachname: true,
            },
        });
        const employee_forms_table = yield tx.employee_forms.create({
            data: {
                user_id: user.id,
                form_type: data.type,
            },
            select: {
                id: true,
                form_type: true,
            },
        });
        yield tx.form_inputs.createMany({
            data: employee_forms_table.form_type === "Offboarding"
                ? FORM_INPUTS_OFFBOARDING.map((field_id) => ({
                    employee_form_id: employee_forms_table.id,
                    form_field_id: field_id,
                }))
                : FORM_INPUTS_ONBOARDING.map((field_id) => ({
                    employee_form_id: employee_forms_table.id,
                    form_field_id: field_id,
                })),
        });
        return {
            user,
            employee_form: employee_forms_table.id,
        };
    }));
};
export const fetchUser = () => __awaiter(void 0, void 0, void 0, function* () {
    const user_information = yield prisma.users.findMany({
        where: {
            employee_forms: {
                some: {
                    form_type: { in: ["Onboarding", "Offboarding"] },
                },
            },
        },
        select: {
            id: true,
            vorname: true,
            nachname: true,
            employee_forms: {
                select: {
                    form_type: true,
                    id: true,
                },
            },
        },
    });
    user_information.forEach((user) => {
        console.log(user.employee_forms);
    });
    return {
        user_information,
    };
});
export const deleteUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const delete_user = yield prisma.users.delete({
        where: {
            id: data,
        },
    });
    return delete_user;
});
export const getUserFormData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.users.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            vorname: true,
            nachname: true,
            employee_forms: {
                select: {
                    id: true,
                    form_type: true,
                    form_inputs: {
                        orderBy: {
                            form_field_id: "asc",
                        },
                        select: {
                            id: true,
                            form_field_id: true,
                            status: true,
                            edit: true,
                            form_fields: {
                                select: {
                                    description: true,
                                    owner: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });
});
export const editdata = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.form_inputs.update({
        where: {
            id: data.id,
        },
        data: {
            status: data.select_option,
            edit: data.editcomment,
        },
    });
});
export const insertHistoryData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.historyFormData.createMany({
        data: {
            status: data.result.select_option,
            edit: data.result.editcomment,
            form_input_id: data.result.id,
            changed_by: data.user.id,
        },
    });
});
export const getHistoryData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.historyFormData.findMany({
        where: {
            form_input_id: data,
        },
        include: {
            auth_user: {
                select: {
                    id: true,
                    email: true,
                    verified: true,
                },
            },
        },
        orderBy: {
            timestamp: "desc",
        },
    });
});
export const insertFileData = (fileData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeForm = yield prisma.employee_forms.findFirst({
            where: {
                user_id: fileData.userId,
            },
        });
        if (!employeeForm) {
            throw new Error(`No employee form found for user ${fileData.userId}`);
        }
        const savedfile = yield prisma.workerFiles.create({
            data: {
                employee_form_id: employeeForm.id,
                original_filename: fileData.original_filename,
                file_size: fileData.file_size,
                content_type: fileData.content_type,
                cloud_url: fileData.cloud_url,
                cloud_key: fileData.cloud_key,
            },
        });
        return savedfile;
    }
    catch (error) {
        console.log("error with filedata insert", error);
        throw error;
    }
});
export const fetchFileData = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield prisma.workerFiles.findMany({
        where: {
            employee_forms: {
                user_id: userId,
            },
        },
        include: {
            employee_forms: {
                include: {
                    users: true,
                },
            },
        },
    });
    return files;
});
export const deleteFiles = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const existingFile = yield prisma.workerFiles.findUnique({
        where: { id },
    });
    if (!existingFile) {
        throw new Error(`File with id ${id} not found`);
    }
    return yield prisma.workerFiles.delete({
        where: { id },
    });
});
export const sendEmployeeEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const { data, error } = yield sendMail(Object.assign({ to: email }, getFormReminderTemplate()));
    appAssert(data === null || data === void 0 ? void 0 : data.id, INTERNAL_SERVER_ERROR, `${error === null || error === void 0 ? void 0 : error.name} - ${error === null || error === void 0 ? void 0 : error.message}`);
    return {
        emailId: data.id,
    };
});
