/*
SmartSoft
Componente: ConsejeroSchema
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema de datos del usuario cosnejero

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose');

const ConsejeroSchema = Schema({
    nombre:{
        type:String,
        require:[true,'El nombre es obligatorio']
    },
    apellido_paterno:{
        type:String,
        require:[true,'El apellido paterno es obligatorio']
    },
    apellido_materno:{
        type:String,
        require:[true,'El apellido materno es obligatorio']
    },
    correo:{
        type:String,
        require:[true,'El correo es obligatorio']
    },
    password: {
        type: String,
        require: [true,'La contraseña es obligatoria']
    },
    institucion: {
        type:String,
        require: [true,'La institución es obligaoria']
    },
    area_interes_1: {
        type:String,
        default:'PENDIENTE',
        //require: [true,'La area de interes 1 es obligatoria']
    },
    area_interes_2: {
        type:String,
        default:'PENDIENTE',
        //require: [true,'La area de interes 2 es obligatoria ']
    },
    rol: {
        type:String,
        require:[true,"El rol es necesario"],
        enum:["CONSEJERO_ROLE"]
    },
    imagen:{
        type:String,
        default:"PENDIENTE"
    },
    estado: {
        type: Boolean,
        default: true
    }
})

ConsejeroSchema.methods.toJSON = function() {
    const {__v, password, _id, ... consejero } = this.toObject();
    consejero.uid = _id;
    return consejero
}

module.exports = model('Consejero',ConsejeroSchema);