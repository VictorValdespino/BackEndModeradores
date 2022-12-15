/*
SmartSoft
Componente: ManualSchema
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema dde la URL del Manual

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose')


const ManualSchema = Schema({
    url:{
        type:String
    }
})



module.exports = model('Manual',ManualSchema)