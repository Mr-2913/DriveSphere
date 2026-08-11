import mongoose from "mongoose";

const carSchema = new mongoose.Schema(
    {
        brand:{
            type:String,
            required:true,
            trim:true,
        },
        model:{
            type:String,
            required:true,
            trim:true,
        },
        varient:{
            type:String,
            trim:true,
        },
        year:{
            type:Number,
            required:true,
        },
        price:{
            type:Number,
            required:true,
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
        dimensions: {
            length: Number,
            width: Number,
            height: Number,
            wheelbase: Number,
            groundClearance: Number,
            bootSpace: Number,
        },
        safety: {
            airbags: Number,
            abs: Boolean,
            esp: Boolean,
            hillAssist: Boolean,
            tractionControl: Boolean,
            ncapRating: Number,
        },
        features: {
            sunroof: Boolean,
            touchscreen: Boolean,
            adas: Boolean,
            cruiseControl: Boolean,
            wirelessCharging: Boolean,
            ventilatedSeats: Boolean,
            panoramicSunroof: Boolean,
        },
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
        timestamps:true,
    }
);

const Car=mongoose.model("Car",carSchema);

export default Car;