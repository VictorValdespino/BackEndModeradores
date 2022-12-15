/*
SmartSoft
Componente: RoleSchema
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se crea el modelo de Role para validar los roles contra la base de datos

Numero de metodos: 1
Componentes relacionados: 
*/
const {Schema,model} = require('mongoose')


const RoleSchema = Schema({

    rol:{
        type:String,
        required:[true,'El rol es obligatorio']
    }

})

module.exports = model('Role',RoleSchema)


