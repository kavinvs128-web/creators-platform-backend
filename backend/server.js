const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/user.routes.js");

const app = express();

// DB connection
connectDB();

// middleware
app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// test API route (for assignment)
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected successfully!" });
});

// routes
app.use("/api/users", userRoutes);

// root route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// port
const PORT = process.env.PORT || 5000;

// start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});