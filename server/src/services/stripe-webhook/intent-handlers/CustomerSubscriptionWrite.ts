import { prisma } from "@/lib/prisma";
import {
    stripe,
    SUBSCRIPTION_EXPAND,
    upsertSubscriptionForOrg,
} from "@/services/stripe-webhook/service/stripeWebhook.service";
import {
    asStripeSubscription,
    normalizeLineItemPrice,
    resolvePlanFromLineItemPrice,
} from "@/utils/stripeSubscriptionWebhook";

export async function handleCustomerSubscriptionWrite(
    rawSubscription: unknown,
): Promise<void> {
    const stripeSubRaw = asStripeSubscription(rawSubscription);
    const retrieved = await stripe.subscriptions.retrieve(stripeSubRaw.id, {
        expand: [...SUBSCRIPTION_EXPAND],
    });
    const stripeSub = asStripeSubscription(retrieved);
    const fromMeta = stripeSub.metadata?.organization_id?.trim() || null;
    const row =
        fromMeta === null
            ? await prisma.subscription.findFirst({
                  where: { stripeSubscriptionId: stripeSub.id },
                  select: { organizationId: true },
              })
            : null;
    const organizationId = fromMeta ?? row?.organizationId ?? null;

    if (!organizationId) {
        console.warn(
            "[stripe webhook] subscription write: could not resolve organization",
            stripeSub.id,
        );
        return;
    }

    const item = stripeSub.items.data[0];
    const plan = resolvePlanFromLineItemPrice(
        normalizeLineItemPrice(item?.price),
    );

    await upsertSubscriptionForOrg(organizationId, stripeSub, plan, null);
}
