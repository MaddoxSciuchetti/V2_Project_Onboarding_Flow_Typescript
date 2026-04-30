import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { adminQueries } from '../query-options/queries/admin.queries';
import { IssueData, WorkerEngagement } from '../schemas/employeeform.schemas';
import { EmployeeWorker } from '../types/employeeform.types';

const CLOSED_STATUS_NAMES = new Set([
  'erledigt',
  'done',
  'completed',
  'closed',
]);

const isOpenIssue = (issue: IssueData) =>
  !CLOSED_STATUS_NAMES.has(issue.issueStatus.name.toLowerCase());

function useEmployeeData() {
  const { data, isLoading } = useQuery<EmployeeWorker>(
    adminQueries.EmployeeWorker()
  );

  const tasksByEmployee = useMemo<Array<[string, WorkerEngagement[]]>>(() => {
    if (!data) return [];
    const groups = new Map<string, WorkerEngagement[]>();

    for (const engagement of data) {
      const filtered: WorkerEngagement = {
        ...engagement,
        issues: engagement.issues.filter(isOpenIssue),
      };
      const ownerId = engagement.responsibleUser.id;
      const group = groups.get(ownerId) ?? [];
      group.push(filtered);
      groups.set(ownerId, group);
    }

    return Array.from(groups.entries());
  }, [data]);

  const openTaskCountsByEmployee = useMemo(() => {
    return new Map(
      tasksByEmployee.map(([ownerId, engagements]) => {
        const totalOpenTasks = engagements.reduce(
          (count, engagement) => count + engagement.issues.length,
          0
        );
        return [ownerId, totalOpenTasks] as const;
      })
    );
  }, [tasksByEmployee]);

  return {
    isLoading,
    tasksByEmployee,
    openTaskCountsByEmployee,
  };
}

export default useEmployeeData;
