import { useSidebar } from '@/components/ui/sidebar';

import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { specificEmployeeData } from '../api';
import { TEmployeeResponse } from '../schemas/schema';

function useGetEmployees() {
  const {
    data: EmployeeData,
    isLoading,
    error,
    isError,
  } = useQuery<TEmployeeResponse>({
    queryKey: ['EmployeeDataSpecifics'],
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
