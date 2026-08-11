const compareRules = {
  price: {
    label: "Price",
    unit: "₹",
    direction: "lower",
  },
  seatingCapacit: {
    label: "Seating Capacity",
    unit: "Seats",
    direction: "higher",
  },
  "engine.cc": {
    label: "Engine",
    unit: "cc",
    direction: "higher",
  },

  "engine.horsepower": {
    label: "Horsepower",
    unit: "PS",
    direction: "higher",
  },

  "engine.torque": {
    label: "Torque",
    unit: "Nm",
    direction: "higher",
  },

  "engine.mileage": {
    label: "Mileage",
    unit: "km/l",
    direction: "higher",
  },

  "engine.topSpeed": {
    label: "Top Speed",
    unit: "km/h",
    direction: "higher",
  },
  "dimensions.length": {
    label: "Length",
    unit: "mm",
    direction: "higher",
  },

  "dimensions.width": {
    label: "Width",
    unit: "mm",
    direction: "higher",
  },

  "dimensions.height": {
    label: "Height",
    unit: "mm",
    direction: "higher",
  },

  "dimensions.wheelbase": {
    label: "Wheelbase",
    unit: "mm",
    direction: "higher",
  },

  "dimensions.groundClearance": {
    label: "Ground Clearance",
    unit: "mm",
    direction: "higher",
  },

  "dimensions.bootSpace": {
    label: "Boot Space",
    unit: "L",
    direction: "higher",
  },

  // ================= SAFETY =================

  "safety.airbags": {
    label: "Airbags",
    unit: "",
    direction: "higher",
  },

  "safety.ncapRating": {
    label: "NCAP Rating",
    unit: "★",
    direction: "higher",
  },
};

export default compareRules;
