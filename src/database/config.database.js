/*
SmartSoft
Componente: dbConnection
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
crea la conección a la base de datos

Numero de metodos: 1
Componentes relacionados: 
*/

const mongoose = require('mongoose')

const dbConnection = async () => {
    
    try {
        
        await mongoose.connect(process.env.MONGO_CNN)
        console.log("conexión exitosa ....")

    } catch (error) {

        console.log(error);
        console.log();
        console.log();

        throw new Error('Error al incializar la base datos');
    }

}

module.exports = {
    dbConnection
}