import type { LucideIcon } from 'lucide-react';

type SidebarItemProps = {
  label: string;
  icon: LucideIcon;
};
export function SidebarItem({ label, icon: Icon }: SidebarItemProps) {
  return (
    <div className="flex items-center gap-3 py-3 group cursor-pointer">
      <Icon className="w-6 h-6 text-interactive-ghost-border group-hover:text-interactive-primary-active " />
      <p className="text-interactive-ghost-border text-body-sm group-hover:text-interactive-primary-active ">
        {label}
      </p>
    </div>
  );
}
