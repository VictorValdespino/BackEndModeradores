/*
SmartSoft
Componente: AsignacionSchema
Fecha de creacion: 01/12/2022, Autorizó: Carlos Alberto Hernández Velázquez, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema de datos de la asignación de salas

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose');

const asignacionSchema = new Schema({
    id_area: {
        type:String,
        require: true
    },
    area_sala: {
        type: String,
        require: true
    },
    nombre_usuario:{
        type: String,
        require: true
    },
    id_usuario: {
        type: String,
        require: true
    },
    area_usuario: {
        type: String,
        require: true
    }
})


module.exports = model("asignacion", asignacionSchema);