import { specificEmployeeData } from '@/features/employee-overview/api/employee-overview.api';
import { useSuspenseQuery } from '@tanstack/react-query';
import { EMPLOYEE_SPECIFICS } from '../consts/query-keys';

function useEmployeeData() {
  const { data: EmployeeData } = useSuspenseQuery({
    queryKey: [EMPLOYEE_SPECIFICS],
    queryFn: specificEmployeeData,
  });

  return {
    EmployeeData,
  };
}

export default useEmployeeData;
