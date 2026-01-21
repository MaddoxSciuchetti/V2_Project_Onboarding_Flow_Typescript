import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { offboarding_router } from "./src/routes/on_off_boarding.route.ts";
import authRoutes from "./src/routes/auth.route.ts";
import sessionRoutes from "./src/routes/session_route.ts";
import authenticate from "./src/middleware/authenticate.ts";
import { APP_ORIGIN } from "./src/constants/env.ts";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.route.ts";

export function createApp() {
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  const app = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    cors({
      origin: APP_ORIGIN,
      credentials: true,
    }),
  );

  // home page
  app.get("/", (req, res) => {
    res.send("here");
  });

  // auth routes

  app.use("/auth", authRoutes);
  app.use("/sessions", authenticate, sessionRoutes);

  // protected routes

  app.use("/user", authenticate, userRoutes);

  // worker
  app.use("/offboarding", offboarding_router);

  return app;
}
