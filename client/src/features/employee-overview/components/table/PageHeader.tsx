import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type PageHeaderProps = {
  openCreate: () => void;
};

function PageHeader({ openCreate }: PageHeaderProps) {
  return (
    <>
      <div className="flex gap-5">
        <Input
          className="focus:border-none focus:outline-none focus:ring-0"
          placeholder="Suche bei Namen"
        />
        <div className="flex gap-2">
          <Button
            className="cursor-pointer rounded-xl hover:bg-gray-200"
            onClick={openCreate}
            variant={'outline'}
          >
            Mitarbeiter Hinzufügen
          </Button>
        </div>
      </div>
    </>
  );
}

export default PageHeader;
