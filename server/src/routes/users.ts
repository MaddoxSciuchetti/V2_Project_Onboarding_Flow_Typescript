import { createUser, getUserById, getUsers } from "../controllers/users.ts";
import { Router } from "express";
const router = Router();

router.get("/", getUsers);

router.get("/:id", getUserById);

router.get("/", createUser);

export { router };
