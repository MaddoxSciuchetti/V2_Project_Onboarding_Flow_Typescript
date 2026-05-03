import { STRIPE_SECRET_KEY } from "@/constants/env";
import { prisma } from "@/lib/prisma";
import { appendSubscriptionAuditLog } from "@/services/subscriptionAudit.service";
import {
    asStripeSubscription,
    buildSubscriptionDbFieldsFromStripeSubscription,
    normalizeLineItemPrice,
    resolvePlanFromLineItemPrice,
    type StripeSubscriptionResource,
} from "@/utils/stripeSubscriptionWebhook";
import type { SubscriptionPlan } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(STRIPE_SECRET_KEY);

const SUBSCRIPTION_EXPAND = [
    "default_payment_method",
    "items.data.price",
] as const;

async function upsertSubscriptionForOrg(
    organizationId: string,
    stripeSub: StripeSubscriptionResource,
    plan: SubscriptionPlan | null,
    actorUserId: string | null,
) {
    const stripeFields =
        buildSubscriptionDbFieldsFromStripeSubscription(stripeSub);

    const existing = await prisma.subscription.findUnique({
        where: { organizationId },
    });

    const subscription = await prisma.subscription.upsert({
        where: { organizationId },
        create: {
            organizationId,
            ...stripeFields,
            plan: plan ?? null,
        },
        update: {
            ...stripeFields,
            ...(plan !== null ? { plan } : {}),
        },
    });

    await appendSubscriptionAuditLog({
        subscriptionId: subscription.id,
        actorUserId,
        source: "webhook",
        action: "stripe.subscription.synced",
        oldValue: existing
            ? { plan: existing.plan, status: existing.status }
            : null,
        newValue: {
            plan: subscription.plan,
            status: subscription.status,
            stripeSubscriptionId: stripeSub.id,
        },
    });
}

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

export async function handleCustomerSubscriptionDeleted(
    rawSubscription: unknown,
): Promise<void> {
    const stripeSub = asStripeSubscription(rawSubscription);
    const row = await prisma.subscription.findFirst({
        where: { stripeSubscriptionId: stripeSub.id },
    });
    if (!row) {
        return;
    }

    const updated = await prisma.subscription.update({
        where: { id: row.id },
        data: { status: "cancelled" },
    });

    await appendSubscriptionAuditLog({
        subscriptionId: row.id,
        source: "webhook",
        action: "stripe.subscription.deleted",
        oldValue: { status: row.status },
        newValue: { status: updated.status },
    });
}
