import { fileModal } from './fileInfo.js';
import { blockModal } from './block.js';
import { sequelize } from '../db.js';

export const initModels = async () => {
  const FileInfos = await fileModal(sequelize);
  const Blocks = await blockModal(sequelize, FileInfos);

  return { FileInfos, Blocks };
};