// src/routes/index.tsx
import { createFileRoute } from "@tanstack/react-router";
import OnOf_Home from "@/features/OnOf_Home";

export const Route = createFileRoute("/")({
  component: OnOf_Home,
});
