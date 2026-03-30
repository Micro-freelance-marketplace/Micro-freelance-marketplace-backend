import express from "express";
import authRoutes from "./src/routes/auth.routes.js";

const app = express();
app.use(express.json());

app.get("/health", (req, res) => res.send("Server is running"));
app.use("/auth", authRoutes);

export default app;