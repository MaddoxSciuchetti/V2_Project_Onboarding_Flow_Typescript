// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router';
import { LoginComponent } from '@/features/auth/components/Login';

export const Route = createFileRoute('/')({
  component: LoginComponent,
});
