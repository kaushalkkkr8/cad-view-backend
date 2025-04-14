
import { exec } from "child_process";
import path from "path";

export const convertDwgToDxf = (inputPath, outputDir) => {
  return new Promise((resolve, reject) => {
    const converterPath = `"C:\\Program Files\\ODA\\ODAFileConverter 25.12.0\\ODAFileConverter.exe"`;
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
