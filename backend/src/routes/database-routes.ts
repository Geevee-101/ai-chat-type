import { Router } from "express";
import {
  authenticateToken,
  authenticateUser,
} from "../middleware/auth-middleware.js";
import { resetDatabase } from "../controllers/database-controllers.js";

const databaseRoutes = Router();

databaseRoutes.post("/reset", resetDatabase);

export default databaseRoutes;
