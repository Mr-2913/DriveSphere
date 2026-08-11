import Car from "../models/car.model.js";
import { buildCarFilter } from "../utils/carQuery.js";


export const createCar = async (req, res) => {
  try {
    // ================= CHECK ADMIN =================
    if (req.user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Access Denied",
      });
    }

    // ================= BASIC DATA =================
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
      // Detailed specifications
      engine,
      dimensions,
      safety,
      features,
      images,
    } = req.body;

    // ================= REQUIRED FIELDS =================
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
      return res.status(400).json({
        success: false,
        message: "Required car fields are missing.",
      });
    }

    // ================= CREATE CAR =================
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
      engine,
      dimensions,
      safety,
      features,
      images,
    });

    // ================= RESPONSE =================
    return res.status(201).json({
      success: true,
      message: "Car entered successfully",
      data: car,
    });
  } catch (error) {
    console.error("Create car error:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllCars = async (req, res) => {
  try {
    const {
      sort,
      page = 1,
      limit = 6
    } = req.query;

    // ---------------- FILTER ----------------
    const filter = buildCarFilter(req.query);

    // ---------------- PAGINATION VALUES ----------------
    const pageNumber = Number(page);
    const limitNumber = Number(limit);

    const skip = (pageNumber - 1) * limitNumber;

    // ---------------- QUERY ----------------
    let query = Car.find(filter);

    // ---------------- SORTING ----------------
    if (sort === "price_asc") {
      query = query.sort({ price: 1 });
    }

    if (sort === "price_desc") {
      query = query.sort({ price: -1 });
    }

    if (sort === "newest") {
      query = query.sort({ year: -1 });
    }

    if (sort === "oldest") {
      query = query.sort({ year: 1 });
    }

    // ---------------- PAGINATION ----------------
    query = query
      .skip(skip)
      .limit(limitNumber);

    // ---------------- EXECUTE QUERY ----------------
    const cars = await query;

    // ---------------- TOTAL CARS ----------------
    const totalCars = await Car.countDocuments(filter);


    // ---------------- TOTAL PAGES ----------------
    const totalPages = Math.ceil(
      totalCars / limitNumber
    );

    // ---------------- RESPONSE ----------------
    return res.status(200).json({
      success: true,
      count: cars.length,
      totalCars,
      currentPage: pageNumber,
      totalPages,
      limit: limitNumber,
      data: cars,
    });
  } catch (error) {
    console.error("Get all cars error:", error);
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

    // ================= BASIC DATA =================
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
      // Detailed data
      engine,
      dimensions,
      safety,
      features,
      images,
    } = req.body;

    // ================= UPDATE OBJECT =================
    const updateData = {};

    // Basic fields
    if (brand !== undefined) {
      updateData.brand = brand;
    }

    if (model !== undefined) {
      updateData.model = model;
    }

    if (variant !== undefined) {
      updateData.variant = variant;
    }

    if (year !== undefined) {
      updateData.year = year;
    }

    if (price !== undefined) {
      updateData.price = price;
    }

    if (bodyType !== undefined) {
      updateData.bodyType = bodyType;
    }

    if (fuelType !== undefined) {
      updateData.fuelType = fuelType;
    }

    if (transmission !== undefined) {
      updateData.transmission = transmission;
    }

    if (seatingCapacity !== undefined) {
      updateData.seatingCapacity = seatingCapacity;
    }

    // ================= DETAILED DATA =================
    if (engine !== undefined) {
      updateData.engine = engine;
    }

    if (dimensions !== undefined) {
      updateData.dimensions = dimensions;
    }

    if (safety !== undefined) {
      updateData.safety = safety;
    }

    if (features !== undefined) {
      updateData.features = features;
    }

    if (images !== undefined) {
      updateData.images = images;
    }

    // ================= UPDATE DATABASE =================
    const updatedCar = await Car.findByIdAndUpdate(id, updateData,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    // ================= CHECK CAR =================
    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    // ================= RESPONSE =================
    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      data: updatedCar,
    });
  } catch (error) {
    console.error("Update car error:", error);
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
