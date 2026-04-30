import { cn } from '@/lib/trycatch';
import { useGetTaskHistory } from '../../../../hooks/useGetTaskHistory';
import {
  TaskHistoryChange,
  TaskHistoryEntry,
} from '../../../../types/index.types';

type HistoryContentProps = {
  taskId: string;
};

const FIELD_LABELS: Record<string, string> = {
  title: 'Titel',
  description: 'Beschreibung',
  statusId: 'Status',
  assigneeUserId: 'Zuständig',
  priority: 'Priorität',
  dueDate: 'Fälligkeit',
};

function getActorLabel(entry: TaskHistoryEntry): string {
  const actor = entry.actorUser;
  if (!actor) return 'Unbekannt';
  const fullName = `${actor.firstName} ${actor.lastName}`.trim();
  return fullName || actor.email;
}

function getActionLabel(entry: TaskHistoryEntry): string {
  if (entry.action === 'issue.created') return 'Aufgabe erstellt';
  if (entry.action === 'issue.updated') return 'Aufgabe aktualisiert';
  return entry.action;
}

function renderChange(change: TaskHistoryChange) {
  const label = FIELD_LABELS[change.field] ?? change.field;
  const from = change.from ?? '–';
  const to = change.to ?? '–';
  return `${label}: ${from} → ${to}`;
}

const HistoryContent = ({ taskId }: HistoryContentProps) => {
  const { historyData, isLoading } = useGetTaskHistory(taskId);

  if (isLoading) {
    return <p className="mt-5 text-muted-foreground">Verlauf wird geladen…</p>;
  }

  if (!historyData || historyData.length === 0) {
    return (
      <p className="mt-5 text-muted-foreground">
        Es wurden noch keine Änderungen vorgenommen
      </p>
    );
  }

  return (
    <div className="pb-4">
      <div className="relative pl-6">
        <div className="absolute left-[7px] top-2 bottom-2 w-px bg-(--border)" />
        <div className="space-y-4">
          {historyData.map((entry) => (
            <div key={entry.id} className="relative">
              <div className="absolute -left-6 top-1.5 h-3 w-3 rounded-full bg-(--chart-2) shadow-sm" />
              <div className="bg-(--dropdown-surface) rounded-lg p-3">
                <div className="mb-2 flex items-center gap-2">
                  {entry.actorUser?.avatarUrl && (
                    <img
                      src={entry.actorUser.avatarUrl}
                      alt={entry.actorUser.email}
                      className="h-8 w-8 rounded-xl object-cover"
                    />
                  )}
                  <span className="text-sm text-foreground">
                    {getActorLabel(entry)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">
                    {new Date(entry.createdAt).toLocaleDateString()}
                  </span>
                  {entry.status && (
                    <span
                      className={cn(
                        'rounded px-2 py-0.5 text-xs font-medium',
                        'bg-(--status-success-bg) text-(--status-success-foreground)'
                      )}
                      style={
                        entry.status.color
                          ? { backgroundColor: entry.status.color }
                          : undefined
                      }
                    >
                      {entry.status.name}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {getActionLabel(entry)}
                </p>
                {entry.changes.length > 0 && (
                  <ul className="mt-1 space-y-0.5 text-xs text-muted-foreground">
                    {entry.changes.map((change) => (
                      <li key={`${entry.id}-${change.field}`}>
                        {renderChange(change)}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryContent;
