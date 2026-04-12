import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/selfmade/button';
import {
  GrowingItem,
  ItemHeader,
  Table,
  TableDivider,
  TableHeader,
} from '@/components/ui/selfmade/table/Table';
import { SettingsHeader } from './SettingsHeader';

function Employees() {
  return (
    <div className="mx-auto flex h-full flex-col overflow-auto rounded-2xl bg-card p-6 md:max-w-8xl">
      <div className="h-full w-full flex flex-col items-center justify-center border-1">
        <SettingsHeader />
        <Table className="w-200 ">
          <TableHeader className=" py-2">
            <Button>Hinzufügen</Button>
            <Input placeholder="Mitarbeite Email" />
          </TableHeader>
          <TableDivider />
          <ItemHeader className="items-center px-2 py-2">
            <GrowingItem>
              <p className="text-body-sm">Name</p>
            </GrowingItem>
            <p>Aktive</p>
          </ItemHeader>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
