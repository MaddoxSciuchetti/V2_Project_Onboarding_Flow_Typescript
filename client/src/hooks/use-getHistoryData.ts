import { getHistoryData } from "@/lib/api";
import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import * as React from "react";

export const useGetHistory = (id: number) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["formHistory", id],
    queryFn: () => getHistoryData(id),
    enabled: !!id,
  });

  return {
    historyData: data,
    isLoading,
    error,
    refetchHistory: refetch,
  };
};
