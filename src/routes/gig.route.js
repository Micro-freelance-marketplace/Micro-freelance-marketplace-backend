import express from "express";
import { createGig, getGigs, updateGig, deleteGig, getGigById  } from "../controllers/gig.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createGigValidator } from "../validators/gig.validator.js";


const router = express.Router();

// make sure authmiddlware works before  
//importing to  app.js

router.get("/", getGigs);
router.get("/:id", getGigById);

router.post("/", authMiddleware, createGigValidator, validate, createGig);
router.put("/:id", authMiddleware, createGigValidator, validate, updateGig);
router.delete("/:id", authMiddleware, deleteGig);

export default router;