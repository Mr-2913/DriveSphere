import { Router } from "express";
import { registerUser, userLogin, getUserProfile, updateUser, changePassword } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";


const router=Router();

router.post("/register",registerUser);
router.post("/login", userLogin);
router.get("/profile", 
    protect,
    getUserProfile,
);

router.put(
    "/profile",
    protect,
    updateUser
);
router.put(
    "/change-password",
    protect,
    changePassword
);

export default router;
