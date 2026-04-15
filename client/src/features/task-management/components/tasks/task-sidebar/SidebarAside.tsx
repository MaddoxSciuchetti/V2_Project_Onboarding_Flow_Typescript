import { cn } from '@/lib/trycatch';
import type { ComponentProps } from 'react';

export type SidebarAsideProps = ComponentProps<'aside'> & {
  isOpen: boolean;
};

export function SidebarAside({
  className,
  isOpen,
  children,
  ...props
}: SidebarAsideProps) {
  return (
    <aside
      className={cn(
        'fixed right-0 top-0 z-50 h-screen overflow-hidden border-l border-border bg-(--card) transition-all duration-300 ease-out',
        isOpen ? 'w-110' : 'w-0',
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
}
