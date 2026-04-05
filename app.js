import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from '@exortek/express-mongo-sanitize';
import './src/models/userProfile.model.js';
import hpp from "hpp";
import rateLimit from 'express-rate-limit';
import morgan from "morgan";

import AppError from './src/utils/AppError.js';
import globalErrorHandler from './src/controllers/error.controller.js';

import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/userProfile.route.js";
import reviewRoutes from "./src/routes/userReview.route.js";
import gigRoutes from "./src/routes/gig.route.js";
import applicationRoutes from "./src/routes/application.routes.js";

const app = express();

app.use(helmet());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true
}));

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try agian in an hour!',
});

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize());
app.use(hpp());


app.get("/health", (req, res) => res.status(200).json({
    status: "success",
    message: "Server is running"
}));

app.use("/auth", limiter, authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/applications", applicationRoutes);

app.use((req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;