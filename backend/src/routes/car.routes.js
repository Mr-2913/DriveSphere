import { Router } from 'express';
import { createCar, getAllCars, getCarById, updateCar, deleteCar} from '../controllers/car.controller.js';
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";

const router = Router();

router.post("/",
    protect,
    authorize("admin"),
    createCar);

router.get("/", getAllCars);

router.get("/:id", getCarById);

router.put(
  "/:id",
  protect,
  authorize("admin"),
  updateCar
);

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteCar
);

export default router;