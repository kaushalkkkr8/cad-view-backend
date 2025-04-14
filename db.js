import { Sequelize } from 'sequelize';
import { fileModal } from './models/fileInfo.js';
import { blockModal } from './models/block.js';
import dotenv from 'dotenv';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
   
  }
);



export const connection =async()=>{
  console.log("📡 Attempting DB connection...");
  try {
    await sequelize.authenticate();
    const FileInfo = await fileModal(sequelize);
    const Block = await blockModal(sequelize, FileInfo)
    await sequelize.sync()
    console.log('Connection has been established successfully.');
    return { sequelize, FileInfo, Block }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}


