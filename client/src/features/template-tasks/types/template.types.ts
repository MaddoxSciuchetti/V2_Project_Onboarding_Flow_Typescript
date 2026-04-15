/**
 * GET /template — aligns with `queryTemplates` in `template.serviceV2.ts`.
 * Dates are ISO strings over JSON (not Prisma `Date`).
 */
export type IssueTemplateListItem = {
  id: string;
  templateName: string;
  templateDescription: string | null;
  type: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
  _count: { items: number };
};
