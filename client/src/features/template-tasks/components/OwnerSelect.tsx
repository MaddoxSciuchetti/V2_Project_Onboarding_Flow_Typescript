import { Dispatch, SetStateAction } from 'react';
import { Control, FieldErrors } from 'react-hook-form';

import FormSelectOptions from '@/components/form/FormSelectOptions';
import useGetEmployees from '@/features/employee-overview/hooks/useGetEmployees';
import { HandleAddSubmit } from '../types/taskForm.types';

type OwnerSelectProps = {
  control: Control<HandleAddSubmit, any, HandleAddSubmit>;
  selectedValue: string;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  errors: FieldErrors<HandleAddSubmit>;
};

const OwnerSelect = ({ errors, control }: OwnerSelectProps) => {
  const { EmployeeData } = useGetEmployees();
  return (
    <>
      <FormSelectOptions
        name="owner"
        control={control}
        errors={errors}
        placeholder="Mitarbeiter"
        data={EmployeeData.map((e) => ({
          value: e.id,
          label: `${e.vorname} ${e.nachname}`,
        }))}
      />
    </>
  );
};

export default OwnerSelect;
