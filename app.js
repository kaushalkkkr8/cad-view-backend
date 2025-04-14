import express from "express";
import dotenv from "dotenv";
import fileRoutes from "./routes/fileRoutes.js";
import blockRoutes from "./routes/blockRoutes.js";

import cors from "cors";

import fs from "fs";
dotenv.config();
const app = express();
import {masterData} from "./component/masterData.js"

const baseurl = masterData?.baseAPIUrl;
const port = masterData?.serverPort;


app.use(express.json());
app.use(cors());
app.use("/files", fileRoutes);
app.use("/blocks", blockRoutes);
if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");


app.listen(port, () => {
    console.log(`App is listing on :${baseurl}/`)
});

export default app;
