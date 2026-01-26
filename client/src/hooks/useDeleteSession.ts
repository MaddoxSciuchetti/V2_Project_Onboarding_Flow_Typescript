import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";
import { SESSIONS } from "./useSessions";

type Cache = {
  createdAt: string;
  id: string;
  isCurrent: boolean;
  userAgent: string;
};

type SessionCache = Cache[];

const useDeleteSession = (sessionId: string) => {
  console.log(sessionId);
  const queryClient = useQueryClient();
  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      const currentcache = queryClient.getQueryData([SESSIONS]);
      console.log("this is the cache", currentcache);
      queryClient.setQueryData<SessionCache>([SESSIONS], (cache) => {
        const updatedCache =
          cache?.filter((session) => session.id !== sessionId) ?? [];
        return updatedCache;
      });
    },
  });
  const updatedCache = queryClient.getQueryData([SESSIONS]);
  console.log("updated cache", updatedCache);

  return { deleteSession: mutate, ...rest };
};

export default useDeleteSession;
