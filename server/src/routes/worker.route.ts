import express from "express";
import {
    addExtraField,
    createWorker,
    deleteFileData,
    getCloudUrl,
    getFileData,
    gethistoryData,
    getProcessData,
    getWorkerData,
    offboardingDeletebyId,
    offboardingEditdata,
    offboardingGetuserbyId,
    postFeature,
    postFileData,
    postHistoryData,
    sendReminder,
} from "../controllers/on_off_boarding.controller";

import { upload } from "../middleware/fileparser";

const worker = express.Router();

worker.post("/addWorker", createWorker);

worker.get("/fetchData", getWorkerData);

worker.delete("/delete/:id", offboardingDeletebyId);

worker.get("/user/:id", offboardingGetuserbyId);

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
