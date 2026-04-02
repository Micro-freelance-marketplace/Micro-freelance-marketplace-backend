import express from "express";
import helmet from 'helmet';
import cors from 'cors';
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

app.use(express.json());

app.get("/health", (req, res) => res.send("Server is running"));
app.use("/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api", reviewRoutes);

export default app;