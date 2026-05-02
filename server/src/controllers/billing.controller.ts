import { OK } from "@/constants/http";
import { createCheckoutSessionSchema } from "@/schemas/billing.schemas";
import { createCheckoutSessionUrl } from "@/services/billing.service";
import catchErrors from "@/utils/catchErrors";

export const createCheckoutSession = catchErrors(async (req, res) => {
    const { price } = createCheckoutSessionSchema.parse(req.body);
    const url = await createCheckoutSessionUrl(price);
    return res.status(OK).json({ url });
});
