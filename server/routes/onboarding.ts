import express from "express";
import { pool } from "../db.ts";
import { postData, fetchData, getUserId, editData, deleteData } from "../handlers/onboarding.ts";



const onboarding_router = express.Router()

onboarding_router.post("/postData", postData);

onboarding_router.get("/fetchData", fetchData);

onboarding_router.get("/user/:id", getUserId )

onboarding_router.put("/editdata", editData);

onboarding_router.delete("/delete/:id", deleteData);

export {onboarding_router};










