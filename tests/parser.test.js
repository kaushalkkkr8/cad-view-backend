import request from "supertest";
import path from "path";
import app from "../app.js";
import { sequelize } from "../models/index.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

afterAll(async () => {
  // Wait for Sequelize to finish all queries and close connection
  await sequelize.close();
});

test("File Upload Which is Dxf File", async () => {
  const filePath = path.join(__dirname, "./test2.dxf");

  const response = await request(app)
    .post("/files/upload")
    .attach("file", filePath);

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    message: "File uploaded and blocks stored.",
  });

  await new Promise((res) => setTimeout(res, 500));
}, 30000);


test("File Upload Which is Dwg File", async () => {
  const filePath = path.join(__dirname, "./testFile.dwg");

  const response = await request(app)
    .post("/files/upload")
    .attach("file", filePath);

  expect(response.status).toBe(201);
  expect(response.body).toEqual({
    message: "File uploaded and blocks stored.",
  });

 
  await new Promise((res) => setTimeout(res, 500));
}, 30000);


test("will get data of all the blocks data",async()=>{
  const response= await request(app).get('/blocks/allBlocksData')

  expect(response.status).toBe(200);
},20000)

test("will get data of all the blocks name with file uploaded with FileId", async () => {
  const response = await request(app).get("/blocks/allBlocks/70");

  expect(response.status).toBe(200);
});
