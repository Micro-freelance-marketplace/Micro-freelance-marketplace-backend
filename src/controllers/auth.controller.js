import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role, campus } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists." });
    }
    const newUser = await User.create({
      name,
      email,
      password, 
      role,
      campus
    });
    return res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    const token = generateToken(user);
    return res.status(200).json({
      message: "Logged in successfully.",
      token
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};