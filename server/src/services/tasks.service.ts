import { prisma } from "@/lib/prisma";
import { createIssue } from "@/services/worker.serviceV2";

export const queryTasks = async (orgId: string) => {
    return prisma.issue.findMany({
        where: {
            workerEngagement: {
                organizationId: orgId,
            },
        },
        orderBy: { createdAt: "desc" },
    });
};

/** Creates an issue for the org using the first engagement + first issue status. */
export async function createTaskInOrg(orgId: string, userId: string) {
    const engagement = await prisma.workerEngagement.findFirst({
        where: { organizationId: orgId },
        orderBy: { createdAt: "asc" },
    });
    if (!engagement) {
        throw new Error("No worker engagement for organization");
    }

    const status = await prisma.organizationStatus.findFirst({
        where: { organizationId: orgId, entityType: "issue" },
        orderBy: { orderIndex: "asc" },
    });
    if (!status) {
        throw new Error("No issue status for organization");
    }

    return createIssue({
        workerEngagementId: engagement.id,
        createdByUserId: userId,
        statusId: status.id,
        title: "Neue Aufgabe",
    });
}
