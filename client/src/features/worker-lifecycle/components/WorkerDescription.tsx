import { WorkerInfoItem } from '../consts/worker-info.consts';

type WorkerDescriptionProps = {
  workerInfo: WorkerInfoItem;
};

const WorkerDescription = ({ workerInfo }: WorkerDescriptionProps) => {
  return (
    <>
      <span
        key={`${workerInfo.label}-label`}
        className={workerInfo.className ?? 'text-muted-foreground'}
      >
        {workerInfo.label}
      </span>
    </>
  );
};

export default WorkerDescription;
