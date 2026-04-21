const express = require("express");
require('dotenv').config();

const connectDB = require('./config/db');
const userRoutes = require("./routes/user.routes.js");

const app = express();

// DB connection
connectDB();

// middleware
app.use(express.json());

// routes
app.use("/api/users", userRoutes);

// test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});