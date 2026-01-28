import express from "express";
import {
  postOffboardingData,
  fetchOffboardingData,
  offboardingGetuserbyId,
  offboardingEditdata,
  offboardingDeletebyId,
  editHistoryData,
  historyData,
} from "../controllers/on_off_boarding.controller.ts";

const offboarding_router = express.Router();

offboarding_router.post("/postoffboardingdata", postOffboardingData);

offboarding_router.get("/fetchData", fetchOffboardingData);

offboarding_router.delete("/delete/:id", offboardingDeletebyId);

offboarding_router.get("/user/:id", offboardingGetuserbyId);

offboarding_router.put("/editdata", offboardingEditdata);

offboarding_router.get("/getHistoryData/:id", historyData);

offboarding_router.post("/editHisoryData", editHistoryData);

export { offboarding_router };
