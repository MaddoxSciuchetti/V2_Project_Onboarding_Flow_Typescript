import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { router } from "./src/routes/users.ts";

import { offboarding_router } from "./src/routes/offboarding.ts";

export function createApp() {
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // home page
  app.get("/", (req, res) => {
    res.send("here");
  });

  // worker
  app.use("/api/users", router);
  app.use("/offboarding", offboarding_router);

  return app;
}
