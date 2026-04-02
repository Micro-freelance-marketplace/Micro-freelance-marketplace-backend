import express from "express";
import {
  applyToGig,
  getApplications,
  updateStatus,
  getMyApplications,
} from "../controllers/application.controller.js";

import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();
router.post("/gigs/:id/apply", authMiddleware, applyToGig);

router.get("/gigs/:id/applications", authMiddleware, getApplications);

router.patch("/applications/:id/status", authMiddleware, updateStatus);

router.get("/my-applications", authMiddleware, getMyApplications);
export default router;