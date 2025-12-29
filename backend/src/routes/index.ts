import { Router } from "express";
import userRoutes from "./auth-routes.js";
import chatsRoutes from "./chats-routes.js";

const appRouter = Router();

appRouter.use("/auth", userRoutes);
appRouter.use("/chats", chatsRoutes);

export default appRouter;
