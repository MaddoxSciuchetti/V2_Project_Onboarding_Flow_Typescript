import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import { onboarding_router } from "./routes/onboarding.ts";
import { offboarding_router } from "./routes/offboarding.ts";
import {router} from "./routes/users.ts"; 


dotenv.config();
const PORT = process.env.PORT || 3000


const app = express()
app.use(express.json())
app.use(express.urlencoded( { extended: true }))
app.use(cors())


// home page
app.get('/', (req, res) => {
    res.send("here")
})

app.use("/api/users", router)
app.use("/onboarding", onboarding_router)
app.use("/offboarding", offboarding_router)


app.listen(PORT)
