var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import z from "zod";
import { createUser, deleteFiles, deleteUser, editdata, fetchFileData, fetchUser, getHistoryData, getUserFormData, insertFileData, insertHistoryData, sendEmployeeEmail, } from "@/src/services/on_off_boarding.auth";
import { generatePresignedUrl, uploadFileToS3 } from "../config/aws";
import { OK } from "../constants/http";
export const postOffboardingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate the request
    try {
        const request = Object.assign({}, req.body.data);
        // business logic
        const { user } = yield createUser(request);
        return res.status(201).json({ success: user });
    }
    catch (error) {
        // return the response
        console.log(error);
        return res.status(500).json({ error: "internal error" });
    }
});
export const fetchOffboardingData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const request = Object.assign({}, req.body);
    const { user_information } = yield fetchUser();
    return res.status(201).json(user_information);
});
export const offboardingDeletebyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const delete_user = yield deleteUser(id);
    return res.status(204).json(delete_user);
});
// formfetch
export const offboardingGetuserbyId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = +req.params.id;
    const param1 = req.query.param1;
    const user = yield getUserFormData(id);
    if (!user) {
        throw new Error("error occued");
    }
    const form = user.employee_forms.find((f) => f.form_type === param1);
    if (!form) {
        return res.status(404).json({ message: "Offboarding form is not found" });
    }
    const response = {
        user: {
            id: user.id,
            vorname: user.vorname,
            nachname: user.nachname,
        },
        form: {
            id: form.id,
            type: form.form_type,
            fields: form.form_inputs.map((input) => ({
                id: input.id,
                form_field_id: input.form_field_id,
                description: input.form_fields.description,
                owner: input.form_fields.owner,
                status: input.status,
                edit: input.edit,
            })),
        },
    };
    return res.status(200).json(response);
});
const requestschema = z.object({
    id: z.coerce.number().int().positive(),
    editcomment: z.string(),
    select_option: z.string(),
});
export const offboardingEditdata = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // validate request
    const request = requestschema.parse(req.body);
    // business log
    const editresponse = yield editdata(request);
    return res.status(200).json(editresponse);
});
export const historySchemaget = z.object({
    id: z.coerce.number(),
});
export const historySchema = z.object({
    result: z.object({
        id: z.coerce.number(),
        editcomment: z.string(),
        select_option: z.string(),
    }),
    user: z.object({
        id: z.string(),
        email: z.string(),
        verified: z.boolean(),
    }),
});
export const gethistoryData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const parsedId = z.coerce.number().parse(id);
    const HistoryData = yield getHistoryData(parsedId);
    return res.status(200).json(HistoryData);
});
export const postHistoryData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = historySchema.parse(req.body);
    const HistoryData = yield insertHistoryData(result);
    return res.status(200).json(HistoryData || []);
});
export const postFileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("=== Express ===");
    console.log("this is the body of EXpress", req.body);
    const id = req.params.id;
    const formId = Array.isArray(id) ? id[0] : id;
    const files = req.files;
    console.log("Received file", files === null || files === void 0 ? void 0 : files.length);
    if (!files || files.length === 0) {
        return res.status(400).json({ error: "No files uploded" });
    }
    const uploadFiles = [];
    for (const file of files) {
        const uploadResult = yield uploadFileToS3(file, formId);
        if (uploadResult.success && uploadResult.key && uploadResult.url) {
            const fileData = {
                userId: parseInt(formId),
                original_filename: file.originalname,
                file_size: file.size,
                content_type: file.mimetype,
                cloud_url: uploadResult.url,
                cloud_key: uploadResult.key,
            };
            console.log("=== FileData ===");
            console.log(fileData);
            const savedfile = yield insertFileData(fileData);
            const sanitizedFile = Object.assign(Object.assign({}, savedfile), { id: savedfile.id.toString(), employee_form_id: Number(savedfile.employee_form_id), file_size: Number(savedfile.file_size) });
            uploadFiles.push(sanitizedFile);
        }
    }
    res.json({
        success: true,
        files: uploadFiles,
        count: uploadFiles.length,
    });
});
export const getFileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const parsedId = z.coerce.number().parse(id);
        const files = yield fetchFileData(parsedId);
        const presignedUrl = yield Promise.all(files.map((file) => __awaiter(void 0, void 0, void 0, function* () {
            return (Object.assign(Object.assign({}, file), { id: file.id.toString(), employee_form_id: file.employee_form_id.toString(), cloud_url: yield generatePresignedUrl(file.cloud_key) }));
        })));
        console.log(files);
        return res.status(200).json(presignedUrl);
    }
    catch (error) {
        console.log(error);
    }
});
export const getProcessData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const formData = yield getUserFormData(id);
        console.log("=== FORMDATA ====");
        console.log(formData);
        return res.status(200).send({ formData });
    }
    catch (error) { }
});
export const deleteFileData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = +req.params.id;
        console.log(id);
        const response = deleteFiles(id);
        return res.status(200).json({ sucess: true });
    }
    catch (error) {
        console.log(error);
    }
});
export const sendReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        console.log(req.body.email);
        const email = req.body.email;
        yield sendEmployeeEmail(email);
        return res.status(OK).json({ sucess: "the email has been sent" });
    }
    catch (error) {
        console.log(error);
    }
});
