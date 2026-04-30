import { OptionsObjekt } from '@/components/ui/selfmade/selectdropdown';
import { EmployeeDataArray } from '@/features/employee-overview/schemas/schema';
import { FilterMode } from '../hooks/useWorkerFilter';
import { WorkerRecord } from '../types/index.types';

export function applyFilter(
  workers: WorkerRecord[],
  mode: FilterMode,
  value: string
): WorkerRecord[] {
  if (!mode || mode === 'all' || !value) return workers;
  switch (mode) {
    case 'engagementType':
      return workers.filter((w) => w.engagements.some((e) => e.type === value));
    case 'status':
      return workers.filter((w) => w.status === value);
    case 'responsible':
      return workers.filter((w) =>
        w.engagements.some((e) => e.responsibleUser.id === value)
      );
    default:
      return workers;
  }
}

const RESPONSIBLE_VALUE = 'responsible';

export function buildResponsibleSubOptions(
  employees: EmployeeDataArray
): OptionsObjekt[] {
  return employees.map((e) => ({
    label: `${e.firstName} ${e.lastName}`,
    value: e.id,
  }));
}

export function withDynamicOptions(
  options: OptionsObjekt[],
  employees: EmployeeDataArray
): OptionsObjekt[] {
  return options.map((option) =>
    option.value === RESPONSIBLE_VALUE
      ? { ...option, subOptions: buildResponsibleSubOptions(employees) }
      : option
  );
}
