import { BriefcaseIcon, TicketIcon, UsersIcon } from 'lucide-react';
import '../../../../globals.css';
import { Logo, Slot } from '../selfmade/avatar';
import { SidebarItem } from '../selfmade/sidebaritem';
function Sidebar({ openModal }: { openModal: () => void }) {
  return (
    <div className="flex flex-col  items-center justify-between rounded-r-xl mt-1 mb-1  py-6 h-50vh  min-w-35 w-35 max-w-35 bg-interactive-secondary-bg">
      <div className="flex gap-2 px-1 flex-col items-center overflow-x-hidden">
        <Logo src="/assets/bsb_logo.png" size="sm" alt="Logo" />
        <Slot
          className="cursor-pointer"
          state="Default"
          transparent="Transparent"
          src="/assets/Search.svg"
        />
      </div>
      <div className="p-1 flex flex-col overflow-x-hidden">
        <SidebarItem label="Handwerker" icon={UsersIcon} />
        <SidebarItem label="Aufgaben" icon={TicketIcon} />
        <SidebarItem label="Unternehmen" icon={BriefcaseIcon} />
      </div>
      <div className=" gap-2 flex flex-col overflow-x-hidden">
        <Slot
          onClick={() => openModal()}
          className="cursor-pointer"
          state="Default"
          transparent="Transparent"
          src="/assets/PartyPopper.svg"
        />

        <Slot
          className="cursor-pointer"
          state="Default"
          transparent="Transparent"
          src="/assets/Plus.svg"
        />
        <Slot
          className="text-text-label-sm cursor-pointer"
          state="Hover"
          transparent="Transparent"
          initials="MS"
        />
      </div>
    </div>
  );
}

export default Sidebar;
