import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import generateToken from '../utils/generateToken.js';

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user);

  const cookieOptions = {
    expires: new Date(
      Date.now() + (Number(process.env.JWT_COOKIE_EXPIRES_IN) || 90) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none', // Required for cross-origin cookies
  };

  res.status(statusCode).cookie('jwt', token, cookieOptions).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

// Register
export const register = async (req, res, next) => {
  const { name, email, password, role, campus } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
      role,
      campus,
    });

    sendTokenResponse(newUser, 201, res);
  } catch (error) {
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
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    sendTokenResponse(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const logout = (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'User logged out successfully',
  });
};