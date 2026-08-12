import express from "express";

import {
  getDashboardStats,
} from "../controllers/adminDashboard.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();

router.get(
  "/stats",
  protect,
  authorize("admin"),
  getDashboardStats
);

export default router;