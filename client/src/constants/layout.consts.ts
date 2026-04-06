import { BriefcaseIcon, TicketIcon, UsersIcon } from 'lucide-react';

export const LAYOUTITEMS = [
  {
    title: 'Meine Handwerker',
    to: '/worker-lifycycle',
    icon: UsersIcon,
  },
  {
    title: 'Aufgaben',
    to: '/tasks',
    icon: TicketIcon,
  },
  {
    title: 'Unternehmen',
    to: '/org-settings',
    icon: BriefcaseIcon,
  },
];
