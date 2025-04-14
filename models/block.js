import { DataTypes } from 'sequelize';

export const blockModal = async (sequelize, fileInfo) => {
  const Blocks = sequelize.define('Blocks', {
    fileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    x: DataTypes.FLOAT,
    y: DataTypes.FLOAT,
    z: DataTypes.FLOAT,
    xPoint1: DataTypes.FLOAT,
    yPoint1: DataTypes.FLOAT,
    zPoint1: DataTypes.FLOAT,
    xPoint2: DataTypes.FLOAT,
    yPoint2: DataTypes.FLOAT,
    zPoint2: DataTypes.FLOAT,
    layer: DataTypes.STRING,
    handle: DataTypes.STRING,
    text: DataTypes.STRING,
    angle: DataTypes.FLOAT,
  });

  Blocks.belongsTo(fileInfo, { foreignKey: 'fileId', onDelete: 'CASCADE' });
  return Blocks;
};

