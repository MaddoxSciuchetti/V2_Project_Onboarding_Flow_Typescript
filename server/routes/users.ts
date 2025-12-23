import { getUserById, getUsers } from "../handlers/users.ts";
import { Router } from "express"
const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById)

export {router};