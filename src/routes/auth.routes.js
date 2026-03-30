import express from "express";
import { register, login } from '../controllers/auth.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: `Hello ${req.user.name}, you accessed a protected route!` });
});

export default router;