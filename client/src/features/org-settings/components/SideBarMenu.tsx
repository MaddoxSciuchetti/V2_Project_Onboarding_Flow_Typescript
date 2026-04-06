import { SidebarItem } from '@/components/ui/selfmade/sidebaritem';
import { Link } from '@tanstack/react-router';
import type { LucideIcon } from 'lucide-react';

export type SideBarMenuLinkItem = {
  id: string;
  label: string;
  icon: LucideIcon;
  to: string;
  search?: Record<string, unknown>;
};

export type SideBarMenuProps<T extends SideBarMenuLinkItem> = {
  items: readonly T[];
  isItemActive: (item: T) => boolean;
};

function SideBarMenu<TItem extends SideBarMenuLinkItem>({
  items,
  isItemActive,
}: SideBarMenuProps<TItem>) {
  return (
    <>
      {items.map((item) => {
        const isActive = isItemActive(item);
        return (
          <Link
            to={item.to}
            {...(item.search !== undefined ? { search: item.search } : {})}
            className={
              isActive
                ? 'bg-[var(--muted)] text-[var(--foreground)] hover:bg-[var(--muted)]'
                : 'hover:bg-[var(--hover-bg)] hover:text-[var(--hover-foreground)]'
            }
          >
            <SidebarItem label={item.label} icon={item.icon} />
          </Link>
        );
      })}
    </>
  );
}

export default SideBarMenu;
