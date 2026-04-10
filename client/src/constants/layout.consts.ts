import {
  Building,
  FileText,
  Folder,
  Inbox,
  ListCheck,
  Settings,
  UserRound,
} from 'lucide-react';

export const LAYOUTITEMS = [
  {
    title: 'Handwerker',
    to: '/worker-lifycycle',
    icon: Inbox,
  },
  {
    title: 'Aufgaben',
    to: '/template',
    icon: Settings,
    requiredPermission: 'CHEF',
  },
];

export const SETTINGSITEMS = [
  {
    title: 'Unternehmen',
    to: '/org-settings',
    icon: Building,
  },
  {
    title: 'Mitarbeiter',
    to: '/org-settings',
    icon: UserRound,
  },
  {
    title: 'Aufgaben',
    to: '/task-settings',
    icon: ListCheck,
  },
  {
    title: 'Projekte',
    to: '/project-settings',
    icon: Folder,
  },
  {
    title: 'Templates',
    to: '/template-settings',
    icon: FileText,
  },
];
