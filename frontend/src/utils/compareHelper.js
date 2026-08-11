export const getNestedValue = (object, path) => {
  return path
    .split(".")
    .reduce((value, key) => value?.[key], object);
};


export const compareValues = (value1, value2, direction) => {

  // Missing values
  if (
    value1 === undefined ||
    value1 === null ||
    value1 === "" ||
    value2 === undefined ||
    value2 === null ||
    value2 === ""
  ) {
    return "none";
  }


  // Zero values
  // Useful for values that may not apply to some cars
  if (value1 === 0 && value2 === 0) {
    return "none";
  }


  // Equal values
  if (value1 === value2) {
    return "equal";
  }


  // Higher is better
  if (direction === "higher") {
    return value1 > value2
      ? "first"
      : "second";
  }


  // Lower is better
  if (direction === "lower") {
    return value1 < value2
      ? "first"
      : "second";
  }


  return "none";
};