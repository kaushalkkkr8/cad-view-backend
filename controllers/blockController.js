import path from "path";
import { initModels } from "../models/index.js";
import { convertDwgToDxf } from "../utils/convertDwgToDxf.js";

import { parseDXF } from "../utils/dxfParser.js";
import { Sequelize } from "sequelize";

let FileInfo, Block;

(async () => {
  const models = await initModels();
  FileInfo = models.FileInfos;
  Block = models.Blocks;
})();

export const uploadFile = async (req, res) => {
  try {
    let { path: filePath, filename } = req.file;
    console.log({ filePath, filename });

    const ext = path.extname(filename).toLowerCase();
    console.log({ ext });

    if (ext === ".dwg") {
      const outputDir = path.dirname(filePath);
      filePath = await convertDwgToDxf(filePath, outputDir);
      filename = path.basename(filePath);
    }
    filename = path.basename(filePath).replace(/^\d+-/, "").split(".").shift();
    const fileInfo = await FileInfo.create({ filename });

    const blocks = parseDXF(filePath);

    await Promise.all(
      blocks.map((b) =>
        Block.create({
          name: b.block || null,
          type: b.type || null,
          x: b.position?.x || 0,
          y: b.position?.y || 0,
          z: b.position?.z || 0,
          xPoint1: b.point1?.x || 0,
          yPoint1: b.point1?.y || 0,
          zPoint1: b.point1?.z || 0,
          xPoint2: b.point2?.x || 0,
          yPoint2: b.point2?.y || 0,
          zPoint2: b.point2?.z || 0,
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

export const fetchAllFile = async (req, res) => {
  try {
    const allFilesData = await FileInfo.findAll();

    res.status(200).json({ message: "all data found", allFilesData });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlocks = async (req, res) => {
  const { fileId } = req.params;
  try {
    const { page = 1, limit = 10, name, type } = req.query;
    const where = {
      fileId, // 👈 Include fileId in filter
    };
    if (name) where.name = name;
    if (type) where.type = type;

    const { count, rows } = await Block.findAndCountAll({
      where,
      attributes: ["name", "id"],
      // order: [
      //   [Sequelize.literal("name IS NULL"), "ASC"], // Puts non-null names first
      //   ["name", "ASC"], // Then sorts names alphabetically
      // ],
      offset: (page - 1) * limit,
      limit: parseInt(limit),
    });

    res.status(200).json({
      blocksData: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBlocks = async (req, res) => {
  try {
    const { page = 1, limit = 10, name, type } = req.query;
    const where = {};
    if (name) where.name = name;
    if (type) where.type = type;

    const { count, rows } = await Block.findAll({
      where,
      offset: (page - 1) * limit,
      limit: parseInt(limit),

    });
    res.status(200).json({
      blocksData: rows,
      total: count,
      page: parseInt(page),
      totalPages: Math.ceil(count / limit),
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBlockById = async (req, res) => {
  try {
    const { id } = req.params;

    const blockData = await Block.findByPk(id);

    if (!blockData) {
      return res.status(404).json({ message: "Block not found" });
    }

    res.status(200).json({ message: "Data Found", data: blockData });
  } catch (error) {
    console.error("Error fetching block by ID:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
