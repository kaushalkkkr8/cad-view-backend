// // utils/convertDwgToDxf.js
// import { exec } from 'child_process';
// import path from 'path';

// export function convertDwgToDxf(inputPath, outputDir) {
//   return new Promise((resolve, reject) => {
//     const converterPath = 'C:\Program Files\ODA\ODAFileConverter 25.12.0'; // 👈 update this path
//     const command = `"${converterPath}" "${path.dirname(inputPath)}" "${outputDir}" 2013 DXF 1 0 1`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error('Conversion Error:', stderr);
//         return reject(error);
//       }

//       // Output filename has same name but .dxf extension
//       const outputFile = path.join(
//         outputDir,
//         path.basename(inputPath, path.extname(inputPath)) + '.dxf'
//       );

//       resolve(outputFile);
//     });
//   });
// }

import { exec } from "child_process";
import path from "path";

// export const convertDwgToDxf = (inputPath, outputDir) => {
//   return new Promise((resolve, reject) => {
//     const converterPath = "C:\Program Files\ODA\ODAFileConverter 25.12.0"; // <== change this
//     const command = `"${converterPath}" "${path.dirname(inputPath)}" "${outputDir}" 2013 DXF 1 0 1`;

//     exec(command, (error, stdout, stderr) => {
//       if (error) {
//         console.error("Conversion error:", stderr);
//         return reject(error);
//       }

//       const outputFile = path.join(
//         outputDir,
//         path.basename(inputPath, path.extname(inputPath)) + ".dxf"
//       );

//       resolve(outputFile);
//     });
//   });
// };



export const convertDwgToDxf = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    const converterPath = `"C:\\Program Files\\ODA\\ODAFileConverter 25.12.0\\ODAFileConverter.exe"`; // make sure this is correct and ends in `.exe`
    const inputFolder = path.dirname(inputPath);
    const inputFileName = path.basename(inputPath, path.extname(inputPath));

    const outputVersion = "ACAD2013";
    const outputType = "DXF";
    const recurse = 1;
    const audit = 0;
    const filter = "*.dwg";

    const command = `${converterPath} "${inputFolder}" "${outputDir}" ${outputVersion} ${outputType} ${recurse} ${audit} "${filter}"`;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error("Conversion error:", stderr);
        return reject(error);
      }

      const outputFile = path.join(outputDir, `${inputFileName}.dxf`);
      resolve(outputFile);
    });
  });
};



