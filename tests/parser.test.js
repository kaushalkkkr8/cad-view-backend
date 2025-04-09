import { parseDXF } from '../utils/dxfParser.js';
import fs from 'fs';

test('parseDXF returns block data', () => {
  const blocks = parseDXF('tests/sample.dxf');
  expect(blocks.length).toBeGreaterThan(0);
  expect(blocks[0]).toHaveProperty('name');
  expect(blocks[0]).toHaveProperty('x');
});
