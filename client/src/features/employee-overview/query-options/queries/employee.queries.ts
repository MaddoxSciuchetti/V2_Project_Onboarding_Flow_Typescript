import { queryOptions } from '@tanstack/react-query';
import { specificEmployeeData } from '../../api/employee-overview.api';
import { EMPLOYEE_SPECIFICS } from '../../consts/query-keys';
import { EmployeeDataArray } from '../../schemas/schema';

export const employeeQueries = {
  getEmployees: () => {
    return queryOptions<EmployeeDataArray, Error, EmployeeDataArray>({
      queryKey: [EMPLOYEE_SPECIFICS],
      queryFn: specificEmployeeData,
    });
  },
};
