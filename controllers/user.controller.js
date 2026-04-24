const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');


// ✅ 1. Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(201).json({
      message: "User registered successfully",
      user: userObj
});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ 2. Get All Users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find(); // password excluded automatically
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// ✅ 3. Get User by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);

  } catch (error) {
    res.status(400).json({ message: "Invalid ID" });
  }
};


// ✅ 4. Update User
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedUser);

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


// ✅ 5. Delete User
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};