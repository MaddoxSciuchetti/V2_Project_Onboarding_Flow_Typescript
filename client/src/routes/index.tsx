// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import Dashboard from "@/features/Dashboard";
import { LoginComponent } from "@/features/Login";

export const Route = createFileRoute("/")({
    component: LoginComponent,
});
