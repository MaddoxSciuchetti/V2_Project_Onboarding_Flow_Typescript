import { useEmployeeModal } from '@/features/employee-overview/hooks/useEmployeeModal';

type EmployeeOpenTasksProps = {
  owner: string;
  openTaskCount: number;
};

const EmployeeOpenTasks = ({
  owner,
  openTaskCount,
}: EmployeeOpenTasksProps) => {
  const { employeeCreate } = useEmployeeModal();

  return (
    <>
      <p
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          employeeCreate(owner);
        }}
      >
        {openTaskCount} Offene Aufgaben
      </p>
    </>
  );
};

export default EmployeeOpenTasks;
