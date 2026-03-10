import { useEmployeeModal } from '@/features/employee-overview/hooks/useEmployeeModal';

type EmployeeOpenTasksProps = {};

const EmployeeOpenTasks = ({}: EmployeeOpenTasksProps) => {
  const { employeeCreate } = useEmployeeModal();
  return (
    <>
      <p
        className="cursor-pointer"
        onClick={(e) => {
          e.stopPropagation();
          employeeCreate();
        }}
      >
        Offene Aufgaben
      </p>
    </>
  );
};

export default EmployeeOpenTasks;
