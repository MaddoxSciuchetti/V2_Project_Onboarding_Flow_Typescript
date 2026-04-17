import { CREATED, NOT_FOUND, OK } from "@/constants/http";
import {
    insertTemplate,
    insertTemplateTask,
    modifyTemplate,
    modifyTemplateTask,
    queryTemplateById,
    queryTemplates,
    queryTemplateTasks,
    removeTemplate,
    removeTemplateTask,
} from "@/services/template.serviceV2";
import appAssert from "@/utils/appAssert";
import catchErrors from "@/utils/catchErrors";

// ── IssueTemplate ────────────────────────────────────────────

const getParam = (param: string | string[]): string =>
    Array.isArray(param) ? param[0] : param;

export const createTemplate = catchErrors(async (req, res) => {
    const userId = req.userId;
    const orgId = req.orgId || "";
    const { templateName, templateDescription, type } = req.body;

    const template = await insertTemplate({
        templateName,
        templateDescription,
        type: type,
        organizationId: orgId,
        createdByUserId: userId,
    });

    return res.status(CREATED).json(template);
});

export const getTemplates = catchErrors(async (req, res) => {
    const orgId = req.orgId;

    const templates = await queryTemplates(orgId);

    return res.status(OK).json(templates);
});

export const getTemplateById = catchErrors(async (req, res) => {
    const id = getParam(req.params.id);
    const orgId = req.orgId;

    const template = await queryTemplateById(id, orgId);
    appAssert(template, NOT_FOUND, "Template not found");

    return res.status(OK).json(template);
});

export const updateTemplate = catchErrors(async (req, res) => {
    const id = getParam(req.params.id);
    const { templateName, templateDescription, type } = req.body;
    const orgId = req.orgId;

    const template = await modifyTemplate(id, {
        templateName,
        templateDescription,
        type,
    });
    return res.status(OK).json(template);
});

export const deleteTemplate = catchErrors(async (req, res) => {
    const id = getParam(req.params.id);
    const orgId = req.orgId;

    await removeTemplate(id, orgId);

    return res.status(OK).json({ message: "Template deleted successfully" });
});

// ── TemplateItem ─────────────────────────────────────────────

export const createTemplateTask = catchErrors(async (req, res) => {
    const templateId = getParam(req.params.templateId);
    const orgId = req.orgId;
    const { taskName, taskDescription, defaultPriority, orderIndex } = req.body;
    console.log(templateId);
    const task = await insertTemplateTask({
        templateId,
        organizationId: orgId,
        taskName,
        taskDescription,
        defaultPriority,
        orderIndex,
    });

    return res.status(CREATED).json(task);
});

export const getTemplateTasks = catchErrors(async (req, res) => {
    const templateId = getParam(req.params.templateId);
    const orgId = req.orgId;

    const result = await queryTemplateTasks(templateId, orgId);
    appAssert(result, NOT_FOUND, "Template not found");

    const { tasks } = result;
    const response = tasks.map((task) => ({
        ...task,
        taskName: task.title,
        taskDescription: task.description,
    }));
    return res.status(OK).json(response);
});

export const updateTemplateTask = catchErrors(async (req, res) => {
    const id = getParam(req.params.id);
    const { taskName, taskDescription, defaultPriority, orderIndex } = req.body;
    const updated = await modifyTemplateTask(id, {
        taskName,
        taskDescription,
        defaultPriority,
        orderIndex,
    });

    return res.status(OK).json(updated);
});

export const deleteTemplateTask = catchErrors(async (req, res) => {
    const id = getParam(req.params.id);
    const orgId = req.orgId;

    await removeTemplateTask(id);

    return res.status(OK).json({ message: "Task deleted successfully" });
});
