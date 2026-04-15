import { cn } from '@/lib/trycatch';
import type { ComponentProps } from 'react';

export type SidebarContentProps = ComponentProps<'div'>;

function SidebarContent({ className, children, ...props }: SidebarContentProps) {
  return (
    <div
      className={cn('min-h-0 flex-1 overflow-y-auto', className)}
      {...props}
    >
      {children}
    </div>
  );
}

export default SidebarContent;
