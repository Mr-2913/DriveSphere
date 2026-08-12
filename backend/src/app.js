import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import carRoutes from "./routes/car.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import adminUserRoutes from "./routes/adminUser.routes.js";
import adminDashboardRoutes from "./routes/adminDashboard.routes.js";
const app = express();


// ========================================
// CORS
// ========================================

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);


// ========================================
// BODY PARSER
// ========================================

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// ========================================
// REQUEST LOGGER
// ========================================

app.use((req, res, next) => {
  console.log("📩 New Request Received");
  console.log(req.method, req.url);

  next();
});


// ========================================
// ROUTES
// ========================================

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cars", carRoutes);
app.use("/api/admin/users", adminUserRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/admin/dashboard", adminDashboardRoutes);

export default app;