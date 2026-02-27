import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type HeaderProps = {
  openCreate: () => void;
};

const Header = ({ openCreate }: HeaderProps) => {
  return (
    <>
      <div className="flex gap-5">
        <Input placeholder="Suche bei Namen" />
        <div className="flex gap-2">
          <Button
            className="cursor-pointer"
            onClick={openCreate}
            variant={'outline'}
          >
            Mitarbeiter Hinzufügen
          </Button>
        </div>
      </div>
    </>
  );
};

export default Header;
