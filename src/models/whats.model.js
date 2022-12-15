/*
SmartSoft
Componente: WhatsAppSchema
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema de datos para la URL del whatsapp

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose')


const WhatsAppSchema = Schema({
    url:{
        type:String
    }
})



module.exports = model('WhatsApp',WhatsAppSchema)