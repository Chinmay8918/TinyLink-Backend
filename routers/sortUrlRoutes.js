import express from "express";
import { LinkController } from "../controllers/sortUrlController.js";

const router = express.Router();

// Health check
router.get("/healthz", LinkController.healthCheck);

// Create a new short URL
router.post("/links", LinkController.createLink);

// Get all short URLs
router.get("/links", LinkController.getAllLinks);



// Delete a short URL
router.delete("/links/:code", LinkController.deleteLink);

// fetch original URL
router.get("/links/:code", LinkController.fetchOriginal);

export default router;
