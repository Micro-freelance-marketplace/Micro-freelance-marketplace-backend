import express from "express";
import { createGig } from "../controllers/gig.controller.js";
import { getGigs } from "../controllers/gig.controller.js";
import { updateGig } from "../controllers/gig.controller.js";
import { deleteGig } from "../controllers/gig.controller.js";
import { getGigById } from "../controllers/gig.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const gigRouter = express.Router();

// make sure authmiddlware works before  
//importing to  app.js

gigRouter.get("/", getGigs);
gigRouter.get("/:id", getGigById);
gigRouter.post("/", authMiddleware, createGig);
gigRouter.put("/:id", authMiddleware, updateGig);
gigRouter.delete("/:id", authMiddleware, deleteGig);

export default gigRouter;