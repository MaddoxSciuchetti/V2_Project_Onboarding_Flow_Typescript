import { fetchTasks } from "@/controllers/task.controller";
import { Router } from "express";

export const taskRoutes = Router();

taskRoutes.get("/", fetchTasks);
