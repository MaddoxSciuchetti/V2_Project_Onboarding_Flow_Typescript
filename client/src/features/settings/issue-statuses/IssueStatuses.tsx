import LoadingAlert from '@/components/alerts/LoadingAlert';
import { Button } from '@/components/ui/selfmade/button';
import { Input } from '@/components/ui/selfmade/input';
import {
  Table,
  TableDivider,
  TableHeader,
} from '@/components/ui/selfmade/table/Table';
import { useState } from 'react';
import { toast } from 'sonner';
import { IssueStatusRow } from './IssueStatusRow';
import { IssueStatusesHeader } from './IssueStatusesHeader';
import { createIssueStatusSchema } from './issue-statuses.schemas';
import { useIssueStatuses } from './useIssueStatuses';

function IssueStatuses() {
  const [newName, setNewName] = useState('');
  const {
    statuses,
    isLoading,
    isError,
    createStatus,
    isCreating,
    updateStatus,
    isUpdating,
    deleteStatus,
    isDeleting,
  } = useIssueStatuses();

  const busy = isCreating || isUpdating || isDeleting;

  const handleAdd = () => {
    const parsed = createIssueStatusSchema.safeParse({ name: newName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? 'Ungültiger Name');
      return;
    }
    createStatus(parsed.data.name, {
      onSuccess: () => setNewName(''),
    });
  };

  if (isLoading) return <LoadingAlert />;
  if (isError) {
    return (
      <div className="p-6">
        Statusliste konnte nicht geladen werden.
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full flex-col overflow-auto rounded-2xl bg-card p-6 md:max-w-8xl">
      <div className="flex h-full w-full flex-col items-center justify-center gap-4">
        <IssueStatusesHeader />
        <Table className="w-200">
          <TableHeader className="gap-3 py-2">
            <Button
              className="text-sm"
              disabled={busy}
              onClick={handleAdd}
            >
              {isCreating ? 'Wird hinzugefügt…' : 'Hinzufügen'}
            </Button>
            <Input
              placeholder="Name des neuen Status"
              value={newName}
              disabled={busy}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAdd();
                }
              }}
            />
          </TableHeader>
          <TableDivider />
          {statuses.map((status) => (
            <IssueStatusRow
              key={status.id}
              status={status}
              totalCount={statuses.length}
              disabled={busy}
              onSaveName={(id, name) => updateStatus({ id, name })}
              onDelete={(id) => deleteStatus(id)}
            />
          ))}
        </Table>
      </div>
    </div>
  );
}

export default IssueStatuses;
