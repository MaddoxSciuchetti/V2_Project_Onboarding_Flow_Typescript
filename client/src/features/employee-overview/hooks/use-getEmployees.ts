import { useQuery } from '@tanstack/react-query';
import { specificEmployeeData } from '../api/employee-overview.api';
import { EMPLOYEE_SPECIFICS } from '../consts/query-keys';
import { EmployeeDataArray } from '../schemas/schema';

function useGetEmployees() {
  const {
    data: EmployeeData,
    isLoading,
    error,
    isError,
  } = useQuery<EmployeeDataArray>({
    queryKey: [EMPLOYEE_SPECIFICS],
    queryFn: specificEmployeeData,
  });

  return {
    EmployeeData,
    isLoading,
    error,
    isError,
  };
}

export default useGetEmployees;
