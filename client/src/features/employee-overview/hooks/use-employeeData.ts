import { specificEmployeeData } from '@/features/employee-overview/api/employee-overview.api';
import { useSuspenseQuery } from '@tanstack/react-query';

function useEmployeeData() {
  const { data: EmployeeData } = useSuspenseQuery({
    queryKey: ['EmployeeDataSpecifics'],
    queryFn: specificEmployeeData,
  });

  return {
    EmployeeData,
  };
}

export default useEmployeeData;
