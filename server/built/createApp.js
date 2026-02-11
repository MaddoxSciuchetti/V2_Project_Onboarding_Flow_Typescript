import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { offboarding_router } from "./src/routes/on_off_boarding.route";
import authRoutes from "./src/routes/auth.route";
import sessionRoutes from "./src/routes/session_route";
import authenticate from "./src/middleware/authenticate";
import { APP_ORIGIN } from "./src/constants/env";
import cookieParser from "cookie-parser";
import userRoutes from "./src/routes/user.route";
import errorHandler from "./src/middleware/errorHandler";
export function createApp() {
    dotenv.config();
    const PORT = process.env.PORT || 3000;
    const app = express();
    app.use(express.json());
    app.use(cookieParser());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors({
        origin: APP_ORIGIN,
        credentials: true,
    }));
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
    app.use(errorHandler);
    return app;
}
