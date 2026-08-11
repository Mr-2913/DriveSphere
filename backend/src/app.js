import express from "express";
import cors from 'cors';

import userRoutes from "./routes/user.routes.js";
import carRoutes from "./routes/car.routes.js";


const app = express();

app.use(
  cors({
    origin: "http://localhost:5173"
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    console.log("📩 New Request Received");
    next();
});

app.use("/api/users", userRoutes);
app.use("/api/cars", carRoutes);


export default app;