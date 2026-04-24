import { createTask, fetchTasks } from "@/controllers/task.controller";
import { Router } from "express";

export const taskRoutes = Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", fetchTasks);
