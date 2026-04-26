import { getUser } from '@/features/auth/api/auth.api';
import { WorkerDetailResponse } from '@/features/worker-lifecycle/types/index.types';
import { useMemo, useState } from 'react';

type WorkerEngagement =
  WorkerDetailResponse['data']['engagements'][number];
export type WorkerIssue = NonNullable<WorkerEngagement['issues']>[number];

const flattenEngagementIssues = (
  data: WorkerDetailResponse | undefined
): WorkerIssue[] =>
  data?.data.engagements.flatMap((engagement) => engagement.issues ?? []) ?? [];

function useFilteredData(data: WorkerDetailResponse | undefined) {
  const [descriptionSearch, setDescriptionSearch] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [showMyItems, setShowMyItems] = useState(false);

  const allIssues = useMemo(() => flattenEngagementIssues(data), [data]);

  const displayData = useMemo(() => {
    let filtered = allIssues;

    const search = descriptionSearch.trim().toLowerCase();
    if (search) {
      filtered = filtered.filter((issue) =>
        issue.id.toLowerCase().includes(search)
      );
    }

    return filtered;
  }, [allIssues, descriptionSearch]);

  const handleMeFilter = async () => {
    if (showMyItems) {
      setShowMyItems(false);
      return;
    }
    const response = await getUser();
    setCurrentUser(response.id);
    setShowMyItems(true);
  };

  return {
    descriptionSearch,
    setDescriptionSearch,
    currentUser,
    setCurrentUser,
    showMyItems,
    setShowMyItems,
    handleMeFilter,
    displayData,
  };
}

export default useFilteredData;
