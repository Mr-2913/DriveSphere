import express from "express";

import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/admin.middleware.js";

const router = express.Router();


// ========================================
// ADMIN ACCESS TEST
// ========================================

router.get(
  "/test",
  protect,
  adminOnly,
  (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Admin access granted",
      admin: req.user,
    });
  }
);


export default router;