import { DataTypes } from "sequelize";
import {sequelize} from "../db.js";

export const  fileModal=async(sequelize)=>{

  const FileInfos = sequelize.define("FileInfos", {
    filename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    uploadDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  })

  
  return FileInfos
}

