import { Button } from '@/components/ui/selfmade/button';
import { Input } from '@/components/ui/selfmade/input';
import {
  GrowingItem,
  Items,
  Table,
  TableDivider,
  TableHeader,
} from '@/components/ui/selfmade/table/Table';
import { useState } from 'react';
import { SettingsHeader } from './SettingsHeader';

function Employees() {
  const [mitarbeiterEmail, setMitarbeiterEmail] = useState('');
  return (
    <div className="mx-auto flex h-full flex-col overflow-auto rounded-2xl bg-card p-6 md:max-w-8xl">
      <div className="h-full w-full flex flex-col items-center justify-center">
        <SettingsHeader />
        <Table className="w-200 ">
          <TableHeader className=" py-2">
            <Button
              onClick={() => {
                console.log(mitarbeiterEmail);
              }}
            >
              Hinzufügen
            </Button>
            <Input
              placeholder="Mitarbeite Email"
              value={mitarbeiterEmail}
              onChange={(e) => setMitarbeiterEmail(e.target.value)}
            />
          </TableHeader>
          <TableDivider />
          <Items state="default" className="px-2 py-0">
            <GrowingItem className="">
              <p className="text-body-sm">Name</p>
            </GrowingItem>
            <p>Aktive</p>
          </Items>
        </Table>
      </div>
    </div>
  );
}

export default Employees;
