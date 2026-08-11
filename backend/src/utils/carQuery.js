export const buildCarFilter = (query) => {

  const {
    search,
    brand,
    fuelType,
    transmission,
    bodyType,
    minPrice,
    maxPrice,
    year
  } = query;


  const filter = {};


  // Search
  if (search) {

    filter.$or = [
      {
        brand: {
          $regex: search,
          $options: "i"
        }
      },
      {
        model: {
          $regex: search,
          $options: "i"
        }
      },
      {
        variant: {
          $regex: search,
          $options: "i"
        }
      }
    ];

  }


  // Brand
  if (brand) {

    filter.brand = {
      $regex: `^${brand}$`,
      $options: "i"
    };

  }


  // Fuel Type
  if (fuelType) {

    filter.fuelType = {
      $regex: `^${fuelType}$`,
      $options: "i"
    };

  }


  // Transmission
  if (transmission) {

    filter.transmission = {
      $regex: `^${transmission}$`,
      $options: "i"
    };

  }


  // Body Type
  if (bodyType) {

    filter.bodyType = {
      $regex: `^${bodyType}$`,
      $options: "i"
    };

  }


  // Price
  if (minPrice || maxPrice) {

    filter.price = {};

    if (minPrice) {
      filter.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      filter.price.$lte = Number(maxPrice);
    }

  }


  // Year
  if (year) {

    filter.year = Number(year);

  }


  return filter;
};