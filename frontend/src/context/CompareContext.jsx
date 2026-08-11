import React, {
  createContext,
  useContext,
  useState,
} from "react";

const CompareContext = createContext(null);


export const CompareProvider = ({ children }) => {

  const [compareCars, setCompareCars] = useState([]);


  const addToCompare = (car) => {

    setCompareCars((currentCars) => {

      // Prevent duplicate car
      const alreadyExists = currentCars.some(
        (item) => item._id === car._id
      );

      if (alreadyExists) {
        return currentCars;
      }


      // Maximum 2 cars
      if (currentCars.length >= 2) {
        return currentCars;
      }


      return [...currentCars, car];

    });

  };


  const removeFromCompare = (carId) => {

    setCompareCars((currentCars) =>
      currentCars.filter(
        (car) => car._id !== carId
      )
    );

  };


  const clearCompare = () => {
    setCompareCars([]);
  };


  return (
    <CompareContext.Provider
      value={{
        compareCars,
        addToCompare,
        removeFromCompare,
        clearCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
};


export const useCompare = () => {

  const context = useContext(CompareContext);

  if (!context) {
    throw new Error(
      "useCompare must be used inside CompareProvider"
    );
  }

  return context;
};