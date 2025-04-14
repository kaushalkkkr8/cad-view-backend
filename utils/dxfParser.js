

import fs from "fs";
import DxfParser from "dxf-parser";

// helper to pick relevant position from the entity
const getRelevantPosition = (entity) => {
  return (
    entity.position ||
    entity.startPoint ||
    entity.anchorPoint ||
    entity.middleOfText ||
    null
  );
};

// cleaner for entities
const entityImpData = (entity, blockName = null) => ({
  type: entity.type,
  layer: entity.layer,
  block: blockName || entity.block || null,
  handle: entity.handle,
  position: getRelevantPosition(entity),
  point1: entity.linearOrAngularPoint1 || null,
  point2: entity.linearOrAngularPoint2 || null,
  text: entity.text || null,
  angle: entity.angle || null,
});

// main function
export const parseDXF = (filePath) => {
  const parser = new DxfParser();
  const data = parser.parseSync(fs.readFileSync(filePath, "utf-8"));

  const globalEntities = data.entities.map((entity) => entityImpData(entity));

  

  const blockEntities = Object.values(data.blocks).flatMap((block) =>
    block.entities?.map((entity) => entityImpData(entity, block.name)) || []
  );

  const allEntities = [...globalEntities, ...blockEntities];

  console.dir(allEntities, { depth: null });

  return allEntities;
};

