import app from "./app.js";
import { connection } from "./db.js";
import dotenv from "dotenv";
dotenv.config();

const PORT = process.env.PORT || 5000;
console.log({PORT});


connection()
  .then(() => {
  
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to DB", err);
  });
