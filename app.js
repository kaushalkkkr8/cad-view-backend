import express from "express";

import fileRoutes from "./routes/fileRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";

import cors from "cors";

import fs from "fs";

const app = express();


app.use(express.json());
app.use(cors());
app.use("/files", fileRoutes);
app.use("/blocks", blockRoutes);
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");



export default app;
