import express from "express";
import { 
    createReview, 
    getReviewsForUser , 
    updateReview , 
    deleteReview} from "../controllers/userReview.Controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const router = express.Router();


router.post("/reviews", authMiddleware, createReview);
router.get("/users/:id/reviews", authMiddleware, getReviewsForUser);
router.put("/reviews/:id", authMiddleware, updateReview);
router.delete("/reviews/:id", authMiddleware, deleteReview);

export default router;