import express from "express";
import { createGig, getGigs, updateGig, deleteGig, getGigById  } from "../controllers/gig.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";
import { createGigValidator } from "../validators/gig.validator.js";


const gigRoutes = express.Router();

// make sure authmiddlware works before  
//importing to  app.js

gigRoutes.get("/", getGigs);
gigRoutes.get("/:id", getGigById);

gigRoutes.post("/", authMiddleware, createGigValidator, validate, createGig);
gigRoutes.put("/:id", authMiddleware, createGigValidator, validate, updateGig);
gigRoutes.delete("/:id", authMiddleware, deleteGig);

export default gigRoutes;