export const getNestedValue = (object, path) => {
  return path
    .split(".")
    .reduce(
      (value, key) => value?.[key],
      object
    );
};


export const compareValue = (
  value1,
  value2,
  direction
) => {

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


  const number1 = Number(value1);
  const number2 = Number(value2);

  if (
    Number.isNaN(number1) ||
    Number.isNaN(number2)
  ) {
    return "none";
  }


  if (number1 === number2) {
    return "equal";
  }


  if (direction === "higher") {
    return number1 > number2
      ? "first"
      : "second";
  }


  if (direction === "lower") {
    return number1 < number2
      ? "first"
      : "second";
  }


  return "none";
};