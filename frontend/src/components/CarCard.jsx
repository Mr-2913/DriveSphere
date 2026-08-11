import React from 'react'
import { Link } from 'react-router-dom';
import './css/CarCard.css'

function CarCard({ car }) {
  return (
    <article className='car-card'>
        <div className="car-image">
            {car.images?.gallery?.length > 0 ? (
                <img 
                src={car.images.gallery[0]}
                alt={`${car.brand} ${car.model}`}
                />
            ):(
                <div className='no-image'>
                    No Images Available
                </div>
            )}
        </div>

        <div className="car-info">
            <p className="car-brand">
                {car.brand}
            </p>

            <h3 className="car-model">
                {car.model}
            </h3>

            {car.varient &&(
                <p className="car-varient">
                    {car.varient}
                </p>
            )}

            <p className="car-price">
                ₹{car.price.toLocaleString("en-IN")}
            </p>

            <div className="car-specifications">
                <span>
                    {car.fuelType }
                </span>
                
                <span>
                    { car.transmission }
                </span>
                
                <span>
                    { car.seatingCapacity } Seats
                </span>
            </div>
            
            <Link
                to={`/cars/${car._id}`}
                className="car-details-btn"
            >
            View Details
            </Link>
        </div>
    </article>
  );
}

export default CarCard;