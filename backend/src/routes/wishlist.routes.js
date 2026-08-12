import express from "express";

import {
  addToWishlist,
  removeFromWishlist,
  getWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller.js";

import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();


// Get user's wishlist
router.get("/", protect, getWishlist);


// Add car
router.post("/:carId", protect, addToWishlist);


// Remove car
router.delete("/:carId", protect, removeFromWishlist);


// Clear wishlist
router.delete("/", protect, clearWishlist);


export default router;