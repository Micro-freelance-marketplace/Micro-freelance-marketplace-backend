import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';

// Register
export const register = async (req, res, next) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }
  const { name, email, password, role, campus } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      role,
      campus,
    });

    const token = generateToken(newUser);

    res.status(201).json({
      message: "User registered successfully!",
      token
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "User validation failed: email: Already exists."
      });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    next(error);
  }
};

// Login
export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "User doesn't exist" });
    }

    if (!(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);

    res.status(200).json({
      message: "Logged in successfully.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Logout 
export const logout = (req, res) => {
  res.status(200).json({
    message: 'Logged out successfully',
  });
};