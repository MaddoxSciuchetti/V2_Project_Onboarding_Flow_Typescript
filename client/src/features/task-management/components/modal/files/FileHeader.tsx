import { Button } from '@/components/ui/button';
import { File_Request } from '@/features/task-management/types/index.types';
import { PlusSquare } from 'lucide-react';

type FileHeaderProps = {
  toggleModal: () => void;
  handleZipExport: (fetchFiles: File_Request[] | undefined) => Promise<void>;
  fetchFiles: File_Request[] | undefined;
};

const FileHeader = ({
  toggleModal,
  handleZipExport,
  fetchFiles,
}: FileHeaderProps) => {
  return (
    <>
      <div className="flex flex-row justify-end pt-5 pr-5 items-center">
        <PlusSquare
          className="flex flex-end cursor-pointer rounded-xl w-8 h-8 bg-(--dropdown-surface) p-1 transition-colors hover:bg-(--hover-bg)"
          onClick={toggleModal}
        />

        <Button
          variant={'outline'}
          onClick={() => handleZipExport(fetchFiles)}
          className="ml-4 cursor-pointer p-1 rounded-xl "
        >
          Zip export
        </Button>
      </div>
    </>
  );
};

export default FileHeader;
