import express from "express";
import {
     getUserProfile , 
     createUserProfile ,
     updateUserProfile , 
     deleteUserProfile , 
     uploadAvatar , 
     deleteAvatar } from "../controllers/userProfile.Controller.js";
import { upload } from "../middleware/upload.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();


router.get("/",authMiddleware , getUserProfile);
router.post("/", authMiddleware, createUserProfile);
router.put("/",authMiddleware , updateUserProfile);
router.delete("/", authMiddleware ,deleteUserProfile);
router.post("/avatar",authMiddleware, upload.single("avatar"), uploadAvatar);
router.delete("/avatar",authMiddleware, deleteAvatar);


export default router;