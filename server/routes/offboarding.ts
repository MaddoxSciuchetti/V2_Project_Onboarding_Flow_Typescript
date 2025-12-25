import express from "express";
import { pool } from "../db.ts";
import { postOffboardingData, fetchOffboardingData, offboardingGetuserbyId, offboardingEditdata, offboardingDeletebyId } from "../handlers/offboarding.ts";


const offboarding_router = express.Router()

offboarding_router.post("/postoffboardingdata",postOffboardingData);

offboarding_router.get("/fetchData", fetchOffboardingData);

offboarding_router.get("/user/:id", offboardingGetuserbyId);

offboarding_router.put("/editdata", offboardingEditdata); 

offboarding_router.delete("/delete/:id", offboardingDeletebyId);

export {offboarding_router};









