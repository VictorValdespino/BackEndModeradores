/*
SmartSoft
Componente: mUploadFile
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
validar extencion de las imagenes

Numero de metodos: 2
Componentes relacionados: 
*/
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const mUploadFile = (files, extencionesValidas = ['png', 'jpg','jpeg'], carpeta = '' ) => {
    
    return new Promise( (resolve,reject) => {

        const { archivo } = files;
        console.log("-> ", archivo)
        //cortamos desde el .
        const nombreCortado = archivo.name.split('.');
        //el ultimo dato de arreglo
        const extension =  nombreCortado [ nombreCortado.length - 1]
        //extenciones validas
        if ( !extencionesValidas.includes( extension ) ) 
        {
          
          return reject(`La extension ${ extension } no es permitida - ${ extencionesValidas }`)

        }
    
    
        const nombreTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join(__dirname, '../uploads', carpeta, nombreTemp);
      
        archivo.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }
      
          resolve( nombreTemp );
          
        });

  });
}

module.exports = {
    mUploadFile
}