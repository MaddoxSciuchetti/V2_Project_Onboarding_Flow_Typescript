// import FormSelectOptions from '@/components/form/FormSelectOptions';
// import { AbsenceData } from '@/features/employee-overview/types/index.types';
// import { Control, FieldErrors } from 'react-hook-form';
// import { Label } from '../../../../../components/ui/label';

// type EmployeeSelectProps = {
//   name: string;
//   control: Control<any>;
//   options: { label: string; value: string }[] | undefined;
//   errors: FieldErrors<AbsenceData>;
//   label: string;
//   placeholder?: string;
// };

// const EmployeeSelect = ({
//   name,
//   control,
//   options,
//   placeholder,
//   label,
//   errors,
// }: EmployeeSelectProps) => {
//   return (
//     <>
//       <Label>{label}</Label>
//       <FormSelectOptions
//         name="substitute"
//         control={control}
//         errors={errors}
//         placeholder={placeholder || ''}
//         data={(options ?? []).map((e) => ({
//           value: e.value,
//           label: `${e.label}`,
//         }))}
//       />
//     </>
//   );
// };

// export default EmployeeSelect;
