import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/selfmade/button';
import { Input } from '@/components/ui/selfmade/input';
import { X } from 'lucide-react';
import type { Dispatch, ReactNode, SetStateAction } from 'react';
import { SidebarAside } from './SidebarAside';
import SidebarContent from './SidebarContent';
import SidebarFooter from './SidebarFooter';
import SidebarHeader from './SidebarHeader';
import { SidebarPanel } from './SidebarPanel';

type TemplateSidebarProps = {
  isOpen: boolean;
  children?: ReactNode;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function TemplateSidebar({
  isOpen,
  children,
  setIsOpen,
}: TemplateSidebarProps) {
  return (
    <SidebarAside isOpen={isOpen}>
      <SidebarPanel>
        <SidebarHeader className="flex items-center justify-end py-3">
          <Button onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" aria-hidden />
          </Button>
        </SidebarHeader>
        <SidebarContent>
          <Label>Name</Label>
          <Input />
        </SidebarContent>
        <SidebarFooter />
      </SidebarPanel>
    </SidebarAside>
  );
}

export default TemplateSidebar;
