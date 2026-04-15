import { GrowingItem, Items } from '@/components/ui/selfmade/table/Table';

export function TemplateItem() {
  return (
    <Items state="hover" className="flex relative items-center">
      <GrowingItem className="pl-10 py-0">
        <p className="typo-body-sm">Name</p>
      </GrowingItem>
      <p>Owner</p>
      <div>
        <p>Here goes the description</p>
      </div>
    </Items>
  );
}
