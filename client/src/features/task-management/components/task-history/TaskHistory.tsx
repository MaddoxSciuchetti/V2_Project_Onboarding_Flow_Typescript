import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { HistoryData } from '../../types/index.types';
import HistoryContent from './HistoryContent';

type TaskHistoryProps = {
  historyData: HistoryData[] | undefined;
  data: string | undefined;
};

const TaskHistory = ({ historyData, data }: TaskHistoryProps) => {
  return (
    <>
      <Accordion type="single" collapsible className="max-w-6xl">
        <AccordionItem value="shipping" className="mb-10 ">
          <AccordionTrigger className=" -blue-600 border-2 p-2 border-gray-300">
            Bearbeitungsverlauf
          </AccordionTrigger>
          <AccordionContent>
            <HistoryContent historyData={historyData} data={data} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default TaskHistory;
