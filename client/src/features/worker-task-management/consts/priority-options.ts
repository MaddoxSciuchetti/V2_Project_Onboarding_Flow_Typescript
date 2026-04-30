import type { IssuePriority } from '../types/index.types';

/** Default when the user does not change priority on a template task. */
export const DEFAULT_TEMPLATE_PRIORITY: IssuePriority = 'medium';

export const TEMPLATE_PRIORITY_OPTIONS: {
  value: Exclude<IssuePriority, 'no_priority'>;
  label: string;
}[] = [
  { value: 'low', label: 'Niedrig' },
  { value: 'medium', label: 'Mittel' },
  { value: 'high', label: 'Hoch' },
  { value: 'urgent', label: 'Dringend' },
];
