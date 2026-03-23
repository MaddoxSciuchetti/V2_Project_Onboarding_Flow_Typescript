import { DescriptionFieldResponse } from '@/types/api.types';
import { addWorkerBaseSchema } from '../schemas/zod.schemas';
import { formatDate } from '../utils/dateCalculation';

export type WorkerInfoItem = {
  label: string;
  value: string | number;
  className?: string;
  schemaKey?: keyof typeof addWorkerBaseSchema.shape | 'austrittsdatum';
};

export const workerInfos = (
  workerInfo: DescriptionFieldResponse
): WorkerInfoItem[] => [
  {
    label: 'Vorname',
    className: 'text-muted-foreground',
    value: workerInfo.worker.vorname,
    schemaKey: 'vorname',
  },
  {
    label: 'Nachname',
    className: 'text-muted-foreground truncate',
    value: workerInfo.worker.nachname,
    schemaKey: 'nachname',
  },
  {
    label: 'E-Mail',
    className: 'text-muted-foreground ',
    value: workerInfo.worker.email || '',
    schemaKey: 'email',
  },
  {
    label: 'Geburtsdatum',
    className: 'text-muted-foreground',
    value: formatDate(workerInfo.worker.geburtsdatum),
    schemaKey: 'geburtsdatum',
  },
  {
    label: 'Adresse',
    className: 'text-muted-foreground',
    value: workerInfo.worker.adresse || '',
    schemaKey: 'adresse',
  },
  {
    label: 'Eintrittsdatum',
    className: 'text-muted-foreground',
    value: formatDate(workerInfo.worker.eintrittsdatum),
    schemaKey: 'eintrittsdatum',
  },
  {
    label: 'Position',
    className: 'text-muted-foreground',
    value: workerInfo.worker.position || '',
    schemaKey: 'position',
  },
  {
    label: 'Austrittsdatum',
    className: 'text-muted-foreground',
    value: formatDate(workerInfo.worker.austrittsdatum),
    schemaKey: 'austrittsdatum',
  },
  {
    label: 'Phase',
    className: 'text-muted-foreground',
    value: workerInfo.form.type,
  },
  {
    label: 'Aufgaben',
    className: 'text-muted-foreground',
    value: workerInfo.form.fields.length,
  },
];
