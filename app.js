import express from "express";
import dotenv from "dotenv";
import fileRoutes from "./routes/fileRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";
import {connection} from './db.js'
connection()
import fs from "fs";
dotenv.config();
const app = express();

const PORT=process.env.PORT||5000


app.use(express.json());


app.use("/api/files", fileRoutes);

app.use("/api/blocks", blockRoutes);

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));