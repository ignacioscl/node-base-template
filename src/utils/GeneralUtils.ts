const path = require('path');
const fs = require('fs');

export const saveBase64AsBinary = async (base64Data : string, filePath:string) : Promise<string> => {
  return new Promise(function(resolve, reject) {
    const base64Image = base64Data.split(';base64,').pop();
    const binaryData = Buffer.from(base64Image, 'base64');
    const directorioProyecto = process.cwd();

// Ruta completa del archivo de destino
    const outputFilePath = path.join(directorioProyecto, filePath);

    const directorioDestino = path.dirname(outputFilePath);
    if (!fs.existsSync(directorioDestino)) {
      fs.mkdirSync(directorioDestino, { recursive: true });
    }
    fs.writeFile(outputFilePath, binaryData,  function(err:any) {
      if (err) {
        reject(err);
      } else {
        resolve(outputFilePath);
      }
    });
  })
}

export const convertString2Float32Array = (jsonString:string) : Float32Array => {
    const jsonArray = JSON.parse(jsonString); // Convertir la cadena JSON en un arreglo

    // Crear un nuevo Float32Array a partir del arreglo
    const float32Array = Float32Array.from(jsonArray);
    return float32Array;
}