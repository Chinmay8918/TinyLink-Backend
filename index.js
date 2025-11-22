import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import sortUrlRoutes from "./routers/sortUrlRoutes.js";

dotenv.config();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", sortUrlRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
