/*
SmartSoft
Componente: CoordinadorSchema
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se crea el modelo de Coordinador para validar los roles contra la base de datos

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose');

const AuxiliarSchema = Schema({
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

    },imagen:{
        type:String,
        default:"PENDIENTE"
    },
    rol:{
        type:String,
        require:[true,"El rol es necesario"],
        enum:["AUXILIAR_ROLE"]
    },
    salas:{
        type:String,
        default:"Esperando sala"
    },
    estado: {
        type: Boolean,
        default: true
    }
})

AuxiliarSchema.methods.toJSON = function() {
    const {__v, password, _id, ... auxiliar } = this.toObject();
    auxiliar.uid = _id;
    return auxiliar
}

module.exports = model('Auxiliar',AuxiliarSchema);