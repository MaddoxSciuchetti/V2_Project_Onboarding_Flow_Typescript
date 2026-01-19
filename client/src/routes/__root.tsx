// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Sidebar, SidebarSection } from "@/components/ui/maddox_sidebar";
import { Maddox_Header } from "@/components/ui/maddox_headbar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Maddox_Header className=" p-6 rounded-xl outline" />
      <div className="min-h-screen flex">
        <Sidebar className="bg-gray-300">
          <SidebarSection />
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
}
