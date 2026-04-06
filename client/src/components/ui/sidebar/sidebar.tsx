import {
  BriefcaseIcon,
  MessageSquareIcon,
  PanelLeftClose,
  TicketIcon,
  UsersIcon,
} from 'lucide-react';
import '../../../../globals.css';
import { ProfileDropdown } from '../selfmade/profiledropdown';
import { SidebarItem } from '../selfmade/sidebaritem';
function Sidebar({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex flex-col  items-center justify-between rounded-r-xl mt-1 mb-1  py-6 h-50vh  min-w-48 w-35 max-w-35 bg-interactive-secondary-bg">
      <div className="w-full p-2">
        <ProfileDropdown />
      </div>
      <div className="p-2 w-full flex flex-col text-left items-stretch overflow-x-hidden">
        <SidebarItem label="Handwerker" icon={UsersIcon} />
        <SidebarItem label="Aufgaben" icon={TicketIcon} />
        <SidebarItem label="Unternehmen" icon={BriefcaseIcon} />
      </div>
      <div className="p-2 w-full flex flex-col overflow-x-hidden">
        <SidebarItem
          onClick={() => openModal()}
          label="Feedback"
          icon={MessageSquareIcon}
        />
        <div className="border-1 border-interactive-ghost-border rounded-full"></div>
        <SidebarItem label="Schliessen" icon={PanelLeftClose} />
      </div>
    </div>
  );
}

export default Sidebar;
