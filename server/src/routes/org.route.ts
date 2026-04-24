import { createInviteHandler } from "@/controllers/invite.controller";
import { listOrgEngagementsHandler } from "@/controllers/orgEngagement.controller";
import {
    createOrgStatusHandler,
    deleteOrgStatusHandler,
    listOrgStatusesHandler,
    updateOrgStatusHandler,
} from "@/controllers/orgStatus.controller";
import { Router } from "express";

const orgRoutes = Router();

orgRoutes.post("/invite", createInviteHandler);
orgRoutes.get("/statuses", listOrgStatusesHandler);
orgRoutes.post("/statuses", createOrgStatusHandler);
orgRoutes.patch("/statuses/:id", updateOrgStatusHandler);
orgRoutes.delete("/statuses/:id", deleteOrgStatusHandler);
orgRoutes.get("/engagements", listOrgEngagementsHandler);

export default orgRoutes;
