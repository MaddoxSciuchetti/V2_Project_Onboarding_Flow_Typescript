import { cn } from '@/lib/trycatch';
import type { ComponentProps } from 'react';

export type SidebarFooterProps = ComponentProps<'footer'>;

function SidebarFooter({ className, children, ...props }: SidebarFooterProps) {
  return (
    <footer
      className={cn(
        'mt-auto shrink-0 border-t border-border px-6 py-3',
        className
      )}
      {...props}
    >
      {children}
    </footer>
  );
}

export default SidebarFooter;
