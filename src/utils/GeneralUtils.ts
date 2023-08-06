import BussinessError from "../types/exceptions/BussinessError";

const fs = require('fs');

export const saveBase64AsBinary = async (base64Data : string, outputFilePath:string) => {
    const base64Image = base64Data.split(';base64,').pop();
    const binaryData = Buffer.from(base64Image, 'base64');
  
    try {
        await fs.writeFile(outputFilePath, binaryData);
      } catch (err) {
        throw err;
      }
  }