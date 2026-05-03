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
import Stripe from "stripe";

export async function handleCheckoutSessionCompleted(
    session: Stripe.Checkout.Session,
): Promise<void> {
    if (session.mode !== "subscription") {
        return;
    }
    if (session.payment_status !== "paid") {
        console.warn(
            "[stripe webhook] checkout.session.completed skipped (not paid)",
            session.id,
            session.payment_status,
        );
        return;
    }

    const organizationId = session.metadata?.organization_id;
    if (!organizationId) {
        console.error(
            "[stripe webhook] checkout.session.completed missing metadata.organization_id",
            session.id,
        );
        return;
    }

    const actorUserId = session.metadata?.user_id ?? null;
    const subId =
        typeof session.subscription === "string"
            ? session.subscription
            : session.subscription?.id;

    if (!subId) {
        console.error(
            "[stripe webhook] checkout.session.completed missing subscription id",
            session.id,
        );
        return;
    }

    const retrieved = await stripe.subscriptions.retrieve(subId, {
        expand: [...SUBSCRIPTION_EXPAND],
    });
    const stripeSub = asStripeSubscription(retrieved);
    const item = stripeSub.items.data[0];
    const plan = resolvePlanFromLineItemPrice(
        normalizeLineItemPrice(item?.price),
    );

    await upsertSubscriptionForOrg(
        organizationId,
        stripeSub,
        plan,
        actorUserId,
    );
}
