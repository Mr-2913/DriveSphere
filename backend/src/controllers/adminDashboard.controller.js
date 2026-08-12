import Car from "../models/car.model.js";
import User from "../models/user.model.js";


export const getDashboardStats = async (req, res) => {
  try {
    // ========================================
    // STATISTICS
    // ========================================

    const totalCars = await Car.countDocuments();

    const totalUsers = await User.countDocuments();

    const totalAdmins = await User.countDocuments({
      role: "admin",
    });


    // ========================================
    // RECENT CARS
    // ========================================

    const recentCars = await Car.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "brand model variant year price images createdAt"
      );


    // ========================================
    // RECENT USERS
    // ========================================

    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select(
        "name username email role createdAt"
      );


    // ========================================
    // RESPONSE
    // ========================================

    return res.status(200).json({
      success: true,

      data: {
        totalCars,
        totalUsers,
        totalAdmins,

        recentCars,
        recentUsers,
      },
    });

  } catch (error) {

    console.error(
      "Dashboard stats error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};