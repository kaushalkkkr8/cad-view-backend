import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadFile } from "../controllers/blockController.js";
const router = express.Router();
router.post("/upload", upload.single("file"), uploadFile);
export default router;
