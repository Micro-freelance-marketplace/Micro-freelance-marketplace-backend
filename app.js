import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
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

if(process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors(
    {
        origin: '*', //we can add routes here at the production time
        optionsSuccessStatus: 200

    }
))

const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP, please try agian in an hour!',
});

app.use(express.json({ limit: '10kb' }));
app.use(mongoSanitize()); // data sanitization
app.use(xss());//data sanitization against XSS
app.use(hpp())

<<<<<<< HEAD
app.get("/api/health", (req, res) => res.status(200).json({
    status: "success", message: "Server is running"
=======

app.get("/api/health", (req, res) => res.status(200).json({
    status: "success", 
    message: "Server is running"
>>>>>>> temp-PR
}));

app.use("/api/auth", limiter, authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/review", reviewRoutes);
app.use("/api/gigs", gigRoutes);
app.use("/api/applications", applicationRoutes);

<<<<<<< HEAD
app.all('/*splat', (req, res, next) => {
=======
app.use((req, res, next) => {
>>>>>>> temp-PR
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;