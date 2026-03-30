import type { IssueTemplateListItem } from '../api/templateV2.api';
import { Link } from '@tanstack/react-router';

type TemplateV2ListProps = {
  issueTemplates: IssueTemplateListItem[];
};

function descriptionSnippet(description: string | null, maxLength = 120) {
  if (!description) return '';
  const trimmed = description.trim();
  if (trimmed.length <= maxLength) return trimmed;
  return `${trimmed.slice(0, maxLength)}…`;
}

const TemplateV2List = ({ issueTemplates }: TemplateV2ListProps) => {
  return (
    <div className="rounded-lg min-h-150 max-h-150 overflow-hidden">
      <ul className="divide-y divide-border mt-3 max-h-150 overflow-y-auto rounded-2xl border">
        {issueTemplates.length === 0 ? (
          <li className="px-4 py-8 text-center text-sm text-muted-foreground">
            Keine Vorlagen gefunden.
          </li>
        ) : (
          issueTemplates.map((issueTemplate) => (
            <li key={issueTemplate.id} className="border-b last:border-b-0">
              <Link
                to="/template/$templateId"
                params={{ templateId: issueTemplate.id }}
                className="group flex cursor-pointer items-start justify-between gap-4 px-4 py-3 transition-colors hover:bg-[var(--secondary)]"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {issueTemplate.name}
                  </p>
                  {issueTemplate.description ? (
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                      {descriptionSnippet(issueTemplate.description)}
                    </p>
                  ) : null}
                </div>
                <span className="shrink-0 rounded-full bg-[var(--muted)] px-2.5 py-1 text-xs font-medium text-muted-foreground">
                  {issueTemplate._count.items}{' '}
                  {issueTemplate._count.items === 1 ? 'Punkt' : 'Punkte'}
                </span>
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TemplateV2List;
