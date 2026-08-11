import mongoose from "mongoose";


const carSchema = new mongoose.Schema(
  {
    // ================= BASIC INFORMATION =================

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      required: true,
      trim: true,
    },

    variant: {
      type: String,
      trim: true,
    },

    year: {
      type: Number,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    bodyType: {
      type: String,
      required: true,
    },

    fuelType: {
      type: String,
      required: true,
    },

    transmission: {
      type: String,
      required: true,
    },

    seatingCapacity: {
      type: Number,
      required: true,
    },


    // ================= ENGINE =================

    engine: {

      cc: {
        type: Number,
      },

      horsepower: {
        type: Number,
      },

      torque: {
        type: Number,
      },

      mileage: {
        type: Number,
      },

      topSpeed: {
        type: Number,
      },

    },


    // ================= DIMENSIONS =================

    dimensions: {

      length: {
        type: Number,
      },

      width: {
        type: Number,
      },

      height: {
        type: Number,
      },

      wheelbase: {
        type: Number,
      },

      groundClearance: {
        type: Number,
      },

      bootSpace: {
        type: Number,
      },

    },


    // ================= SAFETY =================

    safety: {

      airbags: {
        type: Number,
      },

      abs: {
        type: Boolean,
      },

      esp: {
        type: Boolean,
      },

      hillAssist: {
        type: Boolean,
      },

      tractionControl: {
        type: Boolean,
      },

      ncapRating: {
        type: Number,
      },

    },


    // ================= FEATURES =================

    features: {

      sunroof: {
        type: Boolean,
      },

      touchscreen: {
        type: Boolean,
      },

      adas: {
        type: Boolean,
      },

      cruiseControl: {
        type: Boolean,
      },

      wirelessCharging: {
        type: Boolean,
      },

      ventilatedSeats: {
        type: Boolean,
      },

      panoramicSunroof: {
        type: Boolean,
      },

    },


    // ================= IMAGES =================

    images: {

      thumbnail: {
        type: String,
      },

      gallery: [
        {
          type: String,
        },
      ],

    },

  },

  {
    timestamps: true,
  }
);


const Car = mongoose.model("Car", carSchema);


export default Car;