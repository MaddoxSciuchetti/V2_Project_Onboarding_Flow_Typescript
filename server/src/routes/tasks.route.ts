import {
    createTask,
    deleteTasks,
    fetchTaskHistory,
    fetchTasks,
    updateTask,
} from "@/controllers/task.controller";
import { Router } from "express";

export const taskRoutes = Router();

taskRoutes.post("/", createTask);
taskRoutes.get("/", fetchTasks);
taskRoutes.get("/:id/history", fetchTaskHistory);
taskRoutes.patch("/:id", updateTask);
taskRoutes.delete("/", deleteTasks);
