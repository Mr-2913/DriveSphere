import express from "express";

import {
  registerUser,
  userLogin,
  getUserProfile,
  updateUser,
  changePassword,
} from "../controllers/user.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", userLogin);


// Profile
router.get("/profile", protect, getUserProfile);


// Update profile
router.put("/profile", protect, updateUser);


// Change password
router.put("/change-password", protect, changePassword);


export default router;