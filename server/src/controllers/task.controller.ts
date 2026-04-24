import { CREATED, OK } from "@/constants/http";
import { createTaskInOrg, queryTasks } from "@/services/tasks.service";
import catchErrors from "@/utils/catchErrors";

export const fetchTasks = catchErrors(async (req, res) => {
    const orgId = req.orgId;
    const tasks = await queryTasks(orgId);
    return res.status(OK).json(tasks);
});

export const createTask = catchErrors(async (req, res) => {
    const orgId = req.orgId;
    const userId = req.userId;
    const result = await createTaskInOrg(orgId, userId);
    return res.status(CREATED).json(result);
});
