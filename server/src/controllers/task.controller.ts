import { OK } from "@/constants/http";
import { queryTasks } from "@/services/tasks.service";
import catchErrors from "@/utils/catchErrors";

export const fetchTasks = catchErrors(async (req, res) => {
    const orgId = req.orgId;
    const tasks = await queryTasks(orgId);
    return res.status(OK).json(tasks);
});
