import express from "express";
import {
  applyToGig,
  getApplications,
  updateStatus,
  getMyApplications,
} from "../controllers/application.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/apply/:id", authMiddleware, applyToGig);

router.get("/gig/:id", authMiddleware, getApplications);

router.patch("/:id/status", authMiddleware, updateStatus);

router.get("/my-applications", authMiddleware, getMyApplications);

export default router;