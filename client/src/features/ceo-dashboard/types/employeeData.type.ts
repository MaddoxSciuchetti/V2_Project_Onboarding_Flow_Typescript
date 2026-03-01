import { TEmployForm } from './employeeform.type';

export type TAccordion = {
  data: TEmployForm;
  onTaskClick: () => void;
  user: string;
  cleanData: Array<[string, TEmployForm]>;
};

export type EmployeeGroup = {
  employee: { vorname: string; nachname: string; email: string | null };
  inputs: Array<{
    description: string;
    timestamp: Date;
    form_field_id: number;
    status: string;
  }>;
};
