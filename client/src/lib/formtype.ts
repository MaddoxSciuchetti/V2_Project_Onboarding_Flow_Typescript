import { OffboardingItem } from '@/types/OnOfHome';

export const getFirstFormType = (item: OffboardingItem) => {
  return item.employee_forms[0]?.form_type;
};
