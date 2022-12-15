/*
SmartSoft
Componente: Area_InteresSchema
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se crea el modelo de Area_IOnteres para manipular los datos en la base de datos y conectar a su respectiva coleccion

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose')


const Area_InteresSchema = Schema({

    numero_area:{
        type:String
    },
    area_interes:{
        type:String
    }


})



module.exports = model('Area_Interes',Area_InteresSchema)