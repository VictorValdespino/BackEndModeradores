/*
SmartSoft
Componente: UsuarioSchema
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Esquema de datos del usuario moderador

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
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
    },
    area_interes_2: {
        type:String,
    },
    consejero: {
        type:Boolean,
        default:false
    },
    rol: {
        type:String,
        require:[true,"El rol es necesario"],
        enum:["MODERADOR_ROLE"]
    },
    imagen:{
        type:String,
        default:"PENDIENTE"
    },
    estado: {
        type: Boolean,
        default: false
    },
    salas: {
        type:String,
        default:'PENDIENTE'
    }
})

UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ... usuario } = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario',UsuarioSchema);