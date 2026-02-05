import { TEmployForm } from "@/features/Ceo_Dashboard";
import { fetchChefData } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

function useCeoDashboard() {
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // custom hook implementation
  const {
    data: chefdata,
    isLoading,
    error,
  } = useQuery<TEmployForm>({
    queryKey: ["ceo-dashboard"],
    queryFn: fetchChefData,
  });

  const uniqueUsersByOwner = useMemo(() => {
    if (!chefdata) return [];
    const ownerToUserMap = new Map<string, TEmployForm[0]>();
    chefdata.forEach((item) => {
      if (!ownerToUserMap.has(item.owner)) {
        ownerToUserMap.set(item.owner, item);
      }
    });
    return Array.from(ownerToUserMap.values());
  }, [chefdata]);

  const selectUserData = useMemo(
    () => chefdata?.filter((item) => item.owner === selectedUser) || [],
    [selectedUser, chefdata],
  );

  return {
    selectedUser,
    setSelectedUser,
    chefdata,
    uniqueUsersByOwner,
    selectUserData,
    isLoading,
    error,
  };
}

export default useCeoDashboard;
