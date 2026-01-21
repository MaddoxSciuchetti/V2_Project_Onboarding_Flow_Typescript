import express from "express";
import {
  postOffboardingData,
  fetchOffboardingData,
  offboardingGetuserbyId,
  offboardingEditdata,
  offboardingDeletebyId,
} from "../controllers/on_off_boarding.controller.ts";

const offboarding_router = express.Router();

offboarding_router.post("/postoffboardingdata", postOffboardingData);

offboarding_router.get("/fetchData", fetchOffboardingData);

offboarding_router.delete("/delete/:id", offboardingDeletebyId);

offboarding_router.get("/user/:id", offboardingGetuserbyId);

offboarding_router.put("/editdata", offboardingEditdata);

export { offboarding_router };
