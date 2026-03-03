import {
    createTemplateTask,
    postFeature,
    sendReminder,
} from "@/controllers/on_off_boarding.controller";
import { upload } from "@/middleware/fileparser";
import { checkChef } from "@/utils/checkChef";
import { Router } from "express";
import {
    deleteEmplyoee,
    deleteTemplateTask,
    editAbsenceData,
    getEmployee,
    getEmployeeWorkerData,
    getProfilePhoto,
    getTask,
    getUser,
    updateTemplateTask,
    uploadProfilePhoto,
} from "../controllers/user.controller";

const userRoutes = Router();

// prefix /user

userRoutes.get("/", getUser);

// profile

userRoutes.post("/profile/photo", upload.single("file"), uploadProfilePhoto);

userRoutes.get("/profile/photo", getProfilePhoto);

// crud operations with users (that are employee): refactor asap ´
userRoutes.get(
    "/employee/getEmployeeWorkerData",
    checkChef,
    getEmployeeWorkerData,
);

userRoutes.get("/employee/specificEmployeeData", checkChef, getEmployee);

userRoutes.delete("/deleteEmplyoee/:id", checkChef, deleteEmplyoee);

userRoutes.put("/editAbsenceData", checkChef, editAbsenceData);

// template-tasks

userRoutes.delete("/template/task/:id", checkChef, deleteTemplateTask);

userRoutes.get("/template/getTask", checkChef, getTask);

userRoutes.post("/template/createTask", createTemplateTask);

userRoutes.put("/template/updateTask/:id", checkChef, updateTemplateTask);

// userRoutes.get("/rawdescription", checkChef, getTask);

userRoutes.post("/sendReminder", sendReminder);

userRoutes.post("/featurerequest", upload.array("files"), postFeature);

// userRoutes.post("/createTaskData", checkChef, createDescriptionHandler);
// export default userRoutes;
