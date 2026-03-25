import { Button } from '@/components/ui/button';
import { Info } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';
import { FormType } from '../types/index.types';

type WorkerItemInfoProps = {
  setIsInfoModalOpen: Dispatch<SetStateAction<boolean>>;
  gotopage: (taskId: number, form_type: FormType, workerName: string) => void;
  item_value: number;
  form_type: FormType;
  item: string;
  item1: string | undefined;
};

const WorkerItemInfo = ({
  setIsInfoModalOpen,
  gotopage,
  item_value,
  form_type,
  item,
  item1,
}: WorkerItemInfoProps) => {
  return (
    <>
      <div className="flex items-center gap-3">
        <span>
          {item} {item1}
        </span>
        <Button
          type="button"
          size="icon-sm"
          variant="ghost"
          aria-label="Handwerker Informationen"
          className="cursor-pointer rounded-md text-muted-foreground hover:text-foreground"
          onClick={(e) => {
            e.stopPropagation();
            setIsInfoModalOpen(true);
          }}
        >
          <Info className="h-4 w-4" />
        </Button>
        <Button
          type="button"
          size={'sm'}
          variant="outline"
          className="cursor-pointer pointer-events-none opacity-0 transition-opacity duration-150 group-hover:pointer-events-auto group-hover:opacity-100"
          onClick={() =>
            gotopage(item_value, form_type, `${item} ${item1 ?? ''}`.trim())
          }
        >
          Anschauen
        </Button>
      </div>
    </>
  );
};

export default WorkerItemInfo;
