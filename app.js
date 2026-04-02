import express from "express";
import helmet from 'helmet';
import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';

import AppError from './src/utils/AppError.js';
import globalErrorHandler from './src/controllers/error.controller.js';

import authRoutes from "./src/routes/auth.routes.js";
import profileRoutes from "./src/routes/userProfile.route.js";
import reviewRoutes from "./src/routes/userReview.route.js";

const app = express();

app.use(helmet());
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

app.use(express.json({limit: '10kb'}));
app.use(mongoSanitize()); // data sanitization
app.use(xss());//data sanitization against XSS


app.get("/api/health", (req, res) => res.send(200).json({
    status: "success", message: "Server is running"
}));

app.use("/api/auth", authRoutes, limiter);
app.use("/api/profile", profileRoutes);
app.use("/api/review", reviewRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
} );

app.use(globalErrorHandler);

export default app;