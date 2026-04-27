import { OptionsObjekt } from '@/components/ui/selfmade/selectdropdown';

export const FILTER_OPTIONS: OptionsObjekt[] = [
  { label: 'All', value: 'all' },
  {
    label: 'Status',
    value: 'status',
    subOptions: [
      { label: 'Active', value: 'active' },
      { label: 'Inactive', value: 'inactive' },
      { label: 'Archived', value: 'archived' },
    ],
  },
  { label: 'Verantwortlich', value: 'responsible' },
  {
    label: 'Type',
    value: 'engagementType',
    subOptions: [
      { label: 'Onboarding', value: 'onboarding' },
      { label: 'Offboarding', value: 'offboarding' },
      { label: 'Transfer', value: 'transfer' },
    ],
  },
  { label: 'Zuletzt bearbeitet', value: 'lastEdited' },
];
