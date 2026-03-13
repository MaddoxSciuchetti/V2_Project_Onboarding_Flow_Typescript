import { useGetWorkerHistory } from '../../../../hooks/useGetWorkerHistory';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/trycatch';
import { StatusIcon } from '../../../../consts/status.consts';
import { STATUS_MAP } from '../../../../utils/selectOptionTernary';
type HistoryContentProps = {
  id_original: number;
};

const getAvatarFallback = (email: string | null | undefined) => {
  if (!email) return 'U';

  return email.trim().charAt(0).toUpperCase() || 'U';
};

const HistoryContent = ({ id_original }: HistoryContentProps) => {
  const { historyData } = useGetWorkerHistory(id_original);

  return (
    <div className="pb-4">
      {historyData?.length === 0 ? (
        <p className="mt-5 text-muted-foreground">
          Es wurden noch keine Änderungen vorgenommen
        </p>
      ) : (
        <div className="relative pl-6">
          <div className="absolute top-2 bottom-2 left-1.75 w-px bg-(--border)" />

          <div className="space-y-4">
            {historyData?.map((entry) => {
              const status = STATUS_MAP[entry.status ?? ''] ?? {
                label: 'Kein Status',
                className:
                  'bg-(--status-error-bg) text-(--status-error-foreground)',
              };

              return (
                <div key={entry.id} className="relative">
                  <div className="absolute -left-6 top-0.5">
                    <StatusIcon status={entry.status ?? 'offen'} />
                  </div>

                  <div className="bg-(--dropdown-surface) rounded-lg p-3">
                    <div className="mb-1 flex items-start justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        <Avatar className="size-8 border border-border">
                          <AvatarImage
                            src={entry.auth_user?.cloud_url ?? undefined}
                            alt={entry.auth_user?.email ?? 'Unbekannt'}
                          />
                          <AvatarFallback>
                            {getAvatarFallback(entry.auth_user?.email)}
                          </AvatarFallback>
                        </Avatar>

                        <div className="min-w-0">
                          <p className="truncate text-sm text-foreground">
                            Nutzer: {entry.auth_user?.email ?? 'Unbekannt'}
                          </p>
                          <span className="text-xs font-medium text-muted-foreground">
                            {new Date(entry.timestamp || 0).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <span
                        className={cn(
                          'shrink-0 rounded px-2 py-0.5 text-xs font-medium',
                          status.className
                        )}
                      >
                        {status.label}
                      </span>
                    </div>
                    {entry.edit && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        &quot;{entry.edit}&quot;
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoryContent;
