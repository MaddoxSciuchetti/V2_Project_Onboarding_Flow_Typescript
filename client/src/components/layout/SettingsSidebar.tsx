import { SETTINGSITEMS } from '@/constants/layout.consts';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '../ui/selfmade/button';
import { Sidebar } from '../ui/sidebar/sidebar';
import SideBarMenu from '../ui/sidebar/sidebar-menu-item';

export function SettingsSidebar({
  setIsSettingOpen,
}: {
  setIsSettingOpen: (isSettingOpen: boolean) => void;
}) {
  return (
    <Sidebar>
      <div className="w-full p-2">
        <Button onClick={() => setIsSettingOpen(false)}>
          <ArrowLeftIcon className="w-6 h-6" />
        </Button>
        <div className="mt-5">
          <SideBarMenu
            items={SETTINGSITEMS.map((item) => ({
              id: item.to,
              label: item.title,
              icon: item.icon,
              to: item.to,
              search:
                item.to === '/org-settings'
                  ? { currentTab: 'employees' }
                  : undefined,
            }))}
          />
        </div>
      </div>
    </Sidebar>
  );
}
