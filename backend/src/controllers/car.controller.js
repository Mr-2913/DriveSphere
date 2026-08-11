import Car from "../models/car.model.js";
import { buildCarFilter } from "../utils/carQuery.js";


export const createCar = async (req, res) => {
  try {
    // check fro role admin
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // reqest body fetch and create
    const {
      brand,
      model,
      variant,
      year,
      price,
      bodyType,
      fuelType,
      transmission,
      seatingCapacity,
    } = req.body;

    //checks for body items
    if (
      !brand ||
      !model ||
      !year ||
      !price ||
      !bodyType ||
      !fuelType ||
      !transmission ||
      !seatingCapacity
    ) {
      res.status(400).json({
        success: false,
        message: "required car fields are missing.",
      });
    }

    // create cars
    const car = await Car.create({
      brand,
      model,
      variant,
      year,
      price,
      bodyType,
      fuelType,
      transmission,
      seatingCapacity,
    });

    return res.status(200).json({
      success: true,
      message: "car enterd sucessfully",
      data: car,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCars = async (req, res) => {
  try {
    
    const filter= buildCarFilter(req.query);

    const cars = await Car.find(filter);

    return res.status(200).json({
      success: true,
      count: cars.length,
      data: cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCarById = async (req, res) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);

    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not Found",
      });
    }
    return res.status(200).json({
      sucess: true,
      data: car,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCar = async (req, res) => {
  try {
    const { id } = req.params;

    const updateData = {};

    const {
      brand,
      model,
      variant,
      year,
      price,
      bodyType,
      fuelType,
      transmission,
      seatingCapacity,
    } = req.body;

    if (brand !== undefined) updateData.brand = brand;
    if (model !== undefined) updateData.model = model;
    if (variant !== undefined) updateData.variant = variant;
    if (year !== undefined) updateData.year = year;
    if (price !== undefined) updateData.price = price;
    if (bodyType !== undefined) updateData.bodyType = bodyType;
    if (fuelType !== undefined) updateData.fuelType = fuelType;
    if (transmission !== undefined) updateData.transmission = transmission;
    if (seatingCapacity !== undefined) {
      updateData.seatingCapacity = seatingCapacity;
    }

    const updatedCar = await Car.findByIdAndUpdate(id, updateData, {
      returnDocument: "after",
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteCar = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedCar = await Car.findByIdAndDelete(id);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
      data: deletedCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
