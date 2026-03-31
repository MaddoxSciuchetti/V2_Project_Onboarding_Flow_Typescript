import LoadingAlert from '@/components/alerts/LoadingAlert';
import ModalOverlay from '@/components/modal/ModalOverlay';
import { Button } from '@/components/ui/button';
import {
  type OrgStatusEntityType,
  type OrgStatusRow
} from '@/features/org-settings/api/orgStatus.api';
import { orgStatusQueries } from '@/features/org-settings/query-options/queries/orgStatus.queries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { orgStatusMutations } from '../query-options/mutations/orgStatus.mutations';
import { usageLine } from '../utils/usageLine';
import StatusModal from './StatusModal';

type EntityStatusSettingsProps = {
  entityType: OrgStatusEntityType;
  title: string;
  description: string;
};

export function EntityStatusSettings({
  entityType,
  title,
  description,
}: EntityStatusSettingsProps) {
  const { data: statuses = [], isPending } = useQuery(
    orgStatusQueries.list(entityType)
  );
  const [modal, setModal] = useState<OrgStatusRow | 'add' | null>(null);

  const { mutate: remove , isPending: isRemoving } = useMutation(orgStatusMutations.remove());

  if (isPending) return <LoadingAlert />;

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-semibold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-3">
          <span className="text-sm font-medium text-muted-foreground">
            Status
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-8 rounded-lg"
            onClick={() => setModal('add')}
            aria-label="Status hinzufügen"
          >
            <Plus className="size-5" />
          </Button>
        </div>
        <ul className="divide-y divide-border">
          {statuses.map((row) => {
            const canDelete =
              statuses.length > 1 && row.usageCount === 0 && !isRemoving;
            return (
              <li
                key={row.id}
                className="flex items-center gap-3 px-4 py-3.5"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-border bg-muted" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-foreground">{row.name}</p>
                  {row.usageCount > 0 ? (
                    <p className="text-xs text-(--destructive)">
                      {usageLine(entityType, row.usageCount)}
                    </p>
                  ) : null}
                </div>
                <div className="flex shrink-0 gap-1">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-lg"
                    onClick={() => setModal(row)}
                    aria-label="Bearbeiten"
                  >
                    <Pencil className="size-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-9 rounded-lg text-destructive hover:text-destructive"
                    disabled={!canDelete}
                    title={
                      statuses.length <= 1
                        ? 'Der letzte Status kann nicht gelöscht werden'
                        : row.usageCount > 0
                          ? 'Zuerst alle Zuordnungen entfernen'
                          : 'Löschen'
                    }
                    onClick={() => remove(row.id)}
                    aria-label="Löschen"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {modal && (
        <ModalOverlay handleToggle={() => setModal(null)}>
          <StatusModal
            entityType={entityType}
            initial={modal === 'add' ? null : modal}
            onClose={() => setModal(null)}
          />
        </ModalOverlay>
      )}
    </div>
  );
}
