import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { onboarding_router } from "./routes/onboarding.ts";
import { offboarding_router } from "./routes/offboarding.ts";
import {router} from "./routes/users.ts"; 
import { createApp } from "./createApp.ts";

const PORT = process.env.PORT || 3000
const app = createApp();


app.listen(PORT, () => {
    console.log(`port running on ${PORT}`)
})
