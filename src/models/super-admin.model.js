/*
SmartSoft
Componente: Super_AdminSchema
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema de datos para el administrador

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose')


const Super_AdminSchema = Schema({

    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    apellido_paterno:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    apellido_materno:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    correo:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    password:{
        type:String,
        require:[true,'El nombre es obligatorio']
    }


})



module.exports = model('Super_Admin',Super_AdminSchema)