// packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// Utiles
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const branchRoutes = require("./routes/branchRoutes");
const workerRoutes = require("./routes/workerRoutes");
const appointmentRoutes = require("./routes/appointmentRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const productRoutes = require("./routes/productRoutes")

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static(path.join(__dirname, "images")));

app.get("/", (req, res) => {
  res.send(`<h1>Welcome To The Salon idol</h1>`);
});

app.use("/api/users", userRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/workers", workerRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
