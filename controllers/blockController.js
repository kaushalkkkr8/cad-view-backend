import { initModels } from "../models/index.js";

import { parseDXF } from "../utils/dxfParser.js";

let FileInfo, Block;

(async () => {
  const models = await initModels();

  FileInfo = models.FileInfos;
  Block = models.Blocks;
})();

export const uploadFile = async (req, res) => {
  try {
    const { path, filename } = req.file;
    console.log({ path });

    const fileInfo = await FileInfo.create({ filename });

    const blocks = parseDXF(path);

    // await Promise.all(blocks.map((block) => Block.create({ ...block, fileId: fileInfo.id })));
    await Promise.all(
      blocks.map((b) =>
        Block.create({
          name: b.block || null,
          type: b.type || null,
          x: b.position?.x || 0,
          y: b.position?.y || 0,
          z: b.position?.z || 0,
          layer: b.layer || null,
          handle: b.handle || null,
          text: b.text || null,
          angle: b.angle || null,
          fileId: fileInfo.id,
        })
      )
    );
    
    res.status(201).json({ message: "File uploaded and blocks stored." });
  } catch (err) {
    res.status(500).json({ error: "Failed to process file." });
  }
};

// export const getBlocks = async (req, res) => {
//   const { page = 1, limit = 10, name, type } = req.query;
//   const where = {};
//   if (name) where.name = name;
//   if (type) where.type = type;
//   const blocks = await Block.findAll({
//     where,
//     offset: (page - 1) * limit,
//     limit: parseInt(limit),
//   });
//   res.json(blocks);
// };

export const getBlocks = async (req, res) => {
  const { page = 1, limit = 10, name, type } = req.query;
  const where = {};
  if (name) where.name = name;
  if (type) where.type = type;

  const { count, rows } = await Block.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit: parseInt(limit),
  });

  res.json({
    data: rows,
    total: count,
    page: parseInt(page),
    totalPages: Math.ceil(count / limit),
  });
};




export const getBlockById = async (req, res) => {
  const block = await Block.findByPk(req.params.id);
  block ? res.json(block) : res.status(404).json({ error: "Block not found" });
};
