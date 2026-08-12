import User from "../models/user.model.js";
import Car from "../models/car.model.js";


// ========================================
// ADD CAR TO WISHLIST
// ========================================

export const addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.params;

    // Check whether car exists
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found.",
      });
    }

    // Find user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    // Check whether already in wishlist
    const alreadyExists = user.wishlist.some(
      (id) => id.toString() === carId
    );

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Car is already in wishlist.",
      });
    }

    // Add car
    user.wishlist.push(carId);

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Car added to wishlist.",
      data: user.wishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// REMOVE CAR FROM WISHLIST
// ========================================

export const removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { carId } = req.params;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== carId
    );

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Car removed from wishlist.",
      data: user.wishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// GET USER WISHLIST
// ========================================

export const getWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .select("wishlist")
      .populate("wishlist");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      count: user.wishlist.length,
      data: user.wishlist,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// ========================================
// CLEAR ENTIRE WISHLIST
// ========================================

export const clearWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    user.wishlist = [];

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Wishlist cleared successfully.",
      data: [],
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};