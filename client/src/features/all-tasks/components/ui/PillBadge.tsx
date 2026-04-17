import { cn } from '@/lib/trycatch';
import { ReactNode } from 'react';

export function PillBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'ds-label-sm flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-2xl border border-[var(--border-brand)] bg-primary px-3 text-primary-foreground',
        className
      )}
    >
      {children}
    </div>
  );
}
