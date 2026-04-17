import type { DefaultPriority } from '../types/index.types';

/** Matches `DefaultPriority` in Prisma — default used when the user does not change the field. */
export const DEFAULT_TEMPLATE_PRIORITY: DefaultPriority = 'medium';

export const TEMPLATE_PRIORITY_OPTIONS: {
  value: DefaultPriority;
  label: string;
}[] = [
  { value: 'low', label: 'Niedrig' },
  { value: 'medium', label: 'Mittel' },
  { value: 'high', label: 'Hoch' },
  { value: 'urgent', label: 'Dringend' },
];
