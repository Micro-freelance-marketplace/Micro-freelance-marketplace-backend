import express from "express";
import {
    createReview,
    getReviewsForUser,
    updateReview,
    deleteReview
} from "../controllers/userReview.Controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post("/", authMiddleware, createReview);
router.get("/user/:id", authMiddleware, getReviewsForUser);
router.put("/:id", authMiddleware, updateReview);
router.delete("/:id", authMiddleware, deleteReview);

export default router;