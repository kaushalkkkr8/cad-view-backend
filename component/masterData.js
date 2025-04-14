import dotenv from "dotenv";
dotenv.config();
const baseAPIUrl = `http://localhost:${process.env.PORT}`;

export const masterData = {
  baseAPIUrl: baseAPIUrl,
  serverPort: 5000,
};
