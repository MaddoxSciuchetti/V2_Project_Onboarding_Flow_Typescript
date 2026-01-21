import { prisma } from "@/lib/prisma";
import { NOT_FOUND, OK } from "../constants/http";
import appAssert from "../utils/appAssert";
import catchErrors from "../utils/catchErrors";

export const getUserHandler = catchErrors(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    omit: {
      password: true,
    },
  });

  appAssert(user, NOT_FOUND, "User not found");
  return res.status(OK).json(user);
});
