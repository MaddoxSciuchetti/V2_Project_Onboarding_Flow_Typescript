import {
    postFeature,
    sendReminder,
} from "@/controllers/on_off_boarding.controller";
import { upload } from "@/middleware/fileparser";
import { Router } from "express";
import {
    getProfilePhoto,
    getUser,
    uploadProfilePhoto,
} from "../controllers/user.controller";

const userRoutes = Router();

// prefix /user

userRoutes.get("/", getUser);

userRoutes.post("/profile/photo", upload.single("file"), uploadProfilePhoto);
userRoutes.get("/profile/photo", getProfilePhoto);

userRoutes.post("/sendReminder", sendReminder);
userRoutes.post("/featurerequest", upload.array("files"), postFeature);

export { userRoutes };
