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
};

function SideBarMenu<TItem extends SideBarMenuLinkItem>({
  items,
}: SideBarMenuProps<TItem>) {
  return (
    <>
      {items.map((item, index: number) => {
        return (
          <Link
            key={index}
            to={item.to}
            {...(item.search !== undefined ? { search: item.search } : {})}
          >
            <SidebarItem label={item.label} icon={item.icon} />
          </Link>
        );
      })}
    </>
  );
}

export default SideBarMenu;
