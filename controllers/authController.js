import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// Genera el token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
  };

// Registro de usuario
export const registerUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      if (!username || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
  
      const userExists = await User.findOne({ username });
      if (userExists) return res.status(400).json({ message: "User already exists" });
  
      const user = new User({ username, password });
      await user.save();
  
      res.status(201).json({
        message: "User registered successfully",
        token: generateToken(user._id),
      });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error: error.message });
    }
  };

// Login de usuario
export const loginUser = async (req, res) => {
    try {
      const { username, password } = req.body;
  
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ message: "Invalid credentials" });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
  
      res.json({ message: "Login successful", token: generateToken(user._id) });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error: error.message });
    }
  };
