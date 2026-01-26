import { Calendar, Home, Inbox, Search, Settings } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useNavigate } from "react-router-dom";
import UserMenu from "./UserMenu";

// Menu items.

const items = [
  {
    title: "Home",
    to: "/",
    icon: Home,
  },
  {
    title: "Handwerker",
    to: "/handwerker",
    icon: Inbox,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="bg-blue-100 rounded-2xl">
      <SidebarHeader className="mt-5 flex flex-row align-middle">
        <UserMenu />
        <p className="text-black">User</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-black">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-black">
              {items.map((item) => (
                <SidebarMenuItem className="text-black" key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.to}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
