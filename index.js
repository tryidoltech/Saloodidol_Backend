// packages
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");

// Utiles
const connectDB = require("./config/db");

const port = process.env.PORT || 3000;

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send(`<h1>Welcome To The Salon idol</h1>`);
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
