const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

// ✅ IMPORT ROUTERS
const userRoutes = require("./routes/user.routes");
const postRoutes = require("./routes/posts.routes");

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

// test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is connected successfully!" });
});

// ✅ FIXED ROUTES (NO mainRouter)
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/posts", postRoutes);

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