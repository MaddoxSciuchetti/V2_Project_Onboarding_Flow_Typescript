import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TEmployeeResponse } from '@/zod-schemas/schema';
import EmployeeSelect from './EmployeeSelect';
import { SubmitHandler, useForm } from 'react-hook-form';
import { UseMutateFunction } from '@tanstack/react-query';
import { EditDescriptionData } from '@/lib/api';
import { newField } from '@/types/api';

type RootFormProps = {
  editDescriptionMutation: UseMutateFunction<
    EditDescriptionData,
    Error,
    EditDescriptionData,
    unknown
  >;
  handleAddSubmitMutation: UseMutateFunction<
    newField,
    Error,
    {
      description: string;
      template_type: 'ONBOARDING' | 'OFFBOARDING';
      owner: string;
    },
    unknown
  >;
  selectedValue: string;
  description: string | null | undefined;
  setSelectedValue: Dispatch<SetStateAction<string>>;
  EmployeeData: TEmployeeResponse | undefined;
  template_type: 'OFFBOARDING' | 'ONBOARDING' | undefined;
  form_field_id: number | null | undefined;
  mode: 'EDIT' | 'ADD' | undefined;
  setMode: Dispatch<SetStateAction<'EDIT' | 'ADD' | undefined>>;
};

type HandleAddSubmit = {
  form_field_id: number;
  description: string;
  template_type: 'ONBOARDING' | 'OFFBOARDING';
  owner: string;
};

const RootForm = ({
  editDescriptionMutation,
  handleAddSubmitMutation,
  selectedValue,
  description,
  setSelectedValue,
  EmployeeData,
  template_type,
  form_field_id,
  mode,
}: RootFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<HandleAddSubmit>();

  const onSubmit: SubmitHandler<HandleAddSubmit> = (data) =>
    mode === 'EDIT'
      ? console.log(data)
      : // ? editDescriptionMutation(data)
        console.log(data);
  // : handleAddSubmitMutation(data);

  useEffect(() => {
    setValue('owner', selectedValue);
  }, [form_field_id, setValue, selectedValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      name="valuesform"
      className="flex flex-col items-start"
    >
      {mode === 'EDIT'
        ? `${template_type === 'ONBOARDING' ? 'Onboarding' : 'Offboarding'} Aufgabe bearbeiten`
        : `Füge Aufgabe fürs ${template_type === 'ONBOARDING' ? 'Onboarding' : 'Offboarding'} hinzu`}
      <input
        {...register('owner')}
        type="hidden"
        name="owner"
        value={selectedValue || ''}
      />
      <input
        {...register('template_type')}
        type="hidden"
        name="template_type"
        value={template_type}
      />
      {mode === 'EDIT' && (
        <input
          {...register('form_field_id')}
          type="hidden"
          id="form_field_id"
          name="form_field_id"
          value={form_field_id || ''}
        />
      )}
      <Textarea
        {...register('description')}
        defaultValue={description || ''}
        id="description"
        name="description"
        className="w-xl mb-5"
      />
      <div className="flex flex-row gap-2">
        <EmployeeSelect
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          EmployeeData={EmployeeData}
        />
        <Button
          type="submit"
          variant={'outline'}
          className="  text-left justify-start cursor-pointer hover:bg-gray-200 w-71"
        >
          {mode === 'EDIT' ? 'Speichern ' : 'Neue Beschreibung hinzufügen'}
        </Button>
      </div>
    </form>
  );
};

export default RootForm;
