import express from "express"
const offboarding_router = express.Router()



offboarding_router.get("/fetchdata", (req, res) => {
    res.send("fetchdata")
})

export default offboarding_router;

