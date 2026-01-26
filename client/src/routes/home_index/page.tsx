import AppContainer from "@/components/auth/AppContainer";
import { ForgotPassword } from "@/features/ForgotPassword";
import Profile from "@/features/Profile";
import Settings from "@/features/Settings";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/home_index/page")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AppContainer>
        <Profile />
        <Settings />
      </AppContainer>
    </>
  );
}
