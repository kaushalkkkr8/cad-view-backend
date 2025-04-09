import { DataTypes } from 'sequelize';

// export const blockModal=async(sequelize,fileInfo)=>{
//   const Blocks = sequelize.define('Blocks', {
//     name: DataTypes.STRING,
//     type: DataTypes.STRING,
//   x: DataTypes.FLOAT,
//   y: DataTypes.FLOAT,
//   z: DataTypes.FLOAT,
// });

// Blocks.belongsTo(fileInfo, { foreignKey: 'fileId', onDelete: 'CASCADE' });
// return Blocks;
// }


export const blockModal = async (sequelize, fileInfo) => {
  const Blocks = sequelize.define('Blocks', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    z: DataTypes.FLOAT,
    layer: DataTypes.STRING,
    handle: DataTypes.STRING,
    text: DataTypes.STRING,
    angle: DataTypes.FLOAT,
  });

  Blocks.belongsTo(fileInfo, { foreignKey: 'fileId', onDelete: 'CASCADE' });
  return Blocks;
};
