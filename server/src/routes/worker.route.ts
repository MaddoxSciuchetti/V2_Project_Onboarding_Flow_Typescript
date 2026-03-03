import express from "express";
import {
    addExtraField,
    createWorker,
    deleteFileData,
    deleteWorker,
    getCloudUrl,
    getFileData,
    gethistoryData,
    getProcessData,
    getWorkerById,
    getWorkerData,
    offboardingEditdata,
    postFeature,
    postFileData,
    postHistoryData,
    sendReminder,
} from "../controllers/on_off_boarding.controller";

import { upload } from "../middleware/fileparser";

const worker = express.Router();

worker.post("/addWorker", createWorker);

worker.get("/getWorkerData", getWorkerData);

worker.delete("/deleteWorker/:id", deleteWorker);

worker.get("/getWorker/:id", getWorkerById);

worker.put("/editdata", offboardingEditdata);

worker.get("/getHistoryData/:id", gethistoryData);

worker.post("/editHisoryData", postHistoryData);

worker.post("/editdata/file/:id", upload.array("files"), postFileData);

worker.post("/addFormField", addExtraField);

worker.get("/getFileData/file/:id", getFileData);

worker.get("/fetchProcessdata/:id", getProcessData);

worker.delete("/deleteFileData/:id", deleteFileData);

worker.post("/sendReminder", sendReminder);

worker.get("/getCloudUrl", getCloudUrl);

worker.post("/FeatureRequest", upload.array("files"), postFeature);

export { worker };
