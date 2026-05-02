import { Table } from '@/components/ui/selfmade/table/Table';
import { PlanRow } from './PlanRow';
import { SubscriptionRow } from './SubscriptionRow';
import { PAYMENT_PLANS } from './payments.consts';

type PaymentCheckoutDisplayProps = {
  hasActiveSubscription: boolean;
  pendingPriceId: string | null;
  isPortalLoading: boolean;
  onSubscribe: (priceId: string) => void;
  onManageBilling: () => void;
};

export function PaymentCheckoutDisplay({
  hasActiveSubscription,
  pendingPriceId,
  isPortalLoading,
  onSubscribe,
  onManageBilling,
}: PaymentCheckoutDisplayProps) {
  return (
    <section className="flex h-full w-full flex-col items-center justify-center">
      <div className="flex w-200 flex-col items-start">
        <h1 className="typo-h4 font-bold">Zahlungen</h1>
        <p className="typo-body-sm text-muted-foreground">
          {hasActiveSubscription
            ? 'Verwalte dein Abo und deine Zahlungsmethoden.'
            : 'Wähle einen Plan, um dein Abo zu starten.'}
        </p>
      </div>
      <Table className="w-200">
        {hasActiveSubscription ? (
          <SubscriptionRow
            planName="Starter"
            isLoading={isPortalLoading}
            onChangePaymentMethod={onManageBilling}
          />
        ) : (
          PAYMENT_PLANS.map((plan) => (
            <PlanRow
              key={plan.id}
              name={plan.name}
              price={plan.price}
              isLoading={pendingPriceId === plan.priceId}
              onSubscribe={() => onSubscribe(plan.priceId)}
            />
          ))
        )}
      </Table>
    </section>
  );
}
