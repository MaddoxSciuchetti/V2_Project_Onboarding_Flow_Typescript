import { Button } from '@/components/ui/selfmade/button';
import { GrowingItem, Items } from '@/components/ui/selfmade/table/Table';

type SubscriptionRowProps = {
  planName: string;
  isLoading?: boolean;
  onChangePaymentMethod: () => void;
};

export function SubscriptionRow({
  planName,
  isLoading = false,
  onChangePaymentMethod,
}: SubscriptionRowProps) {
  return (
    <Items state="default" className="px-3 py-1">
      <GrowingItem>
        <div className="flex flex-col">
          <p className="typo-body-sm font-medium">Aktuelles Abo</p>
          <p className="typo-caption text-muted-foreground">{planName}</p>
        </div>
      </GrowingItem>
      <Button
        size="small"
        radius="lg"
        className="text-xs"
        disabled={isLoading}
        onClick={onChangePaymentMethod}
      >
        {isLoading ? 'Weiterleitung…' : 'Zahlungsmethode ändern'}
      </Button>
    </Items>
  );
}
