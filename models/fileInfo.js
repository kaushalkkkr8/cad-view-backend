import { DataTypes } from "sequelize";


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

