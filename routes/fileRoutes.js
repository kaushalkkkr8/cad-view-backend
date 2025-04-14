import express from "express";
import { upload } from "../middleware/upload.js";
import { uploadFile,fetchAllFile } from "../controllers/blockController.js";
const router = express.Router();
router.post("/upload", upload.single("file"), uploadFile);
router.get('/',fetchAllFile)

export default router;
