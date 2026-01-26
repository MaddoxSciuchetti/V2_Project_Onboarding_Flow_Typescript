// src/routes/__root.tsx
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/auth/app-sidebar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUp = location.pathname === "/signup";
  const isVerfiy = location.pathname === "/verify-email";

  if (isLoginPage || isSignUp || isVerfiy) {
    return (
      <main className="min-h-screen">
        <Outlet />
      </main>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1">
          <div className="p-4">
            <SidebarTrigger />
            <Outlet />
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
