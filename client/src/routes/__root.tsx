// src/routes/__root.tsx
import { createRootRoute, Outlet, useLocation } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarSection,
} from "@/components/ui/maddox_customs/maddox_sidebar";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";
  const isSignUp = location.pathname === "/signup";
  const isVerfiy = location.pathname === "/verify-email";

  return (
    <>
      <div className="min-h-screen flex">
        {!isLoginPage && !isSignUp && !isVerfiy && (
          <Sidebar className="bg-gray-300">
            <SidebarSection />
          </Sidebar>
        )}

        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
      </div>
    </>
  );
}
