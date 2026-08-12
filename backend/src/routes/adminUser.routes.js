import express from "express";

import {
  getAllUsers,
  updateUserRole,
  deleteUser,
} from "../controllers/adminUser.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = express.Router();


// Get all users
router.get(
  "/",
  protect,
  authorize("admin"),
  getAllUsers
);


// Change user role
router.put(
  "/:id/role",
  protect,
  authorize("admin"),
  updateUserRole
);


// Delete user
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteUser
);


export default router;