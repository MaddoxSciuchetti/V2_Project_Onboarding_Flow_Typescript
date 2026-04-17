import { prisma } from "@/lib/prisma";

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
