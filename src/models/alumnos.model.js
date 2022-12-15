/*
SmartSoft
Componente: salasSchema
Fecha de creacion: 01/11/2022, Autorizó: Carlos Ivan Angeles Reyes, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se crea el modelo de datos de los alumnos que posteriormente se manda a MongoD

Numero de metodos: 1
Componentes relacionados: 
*/

const {Schema,model} = require('mongoose')

const AlumnosSchema = Schema({
    nombre_alumno:
    {
        type: String,
        require:[true,'El nombre es obligatorio']
    },
    institucion_alumno:
    {
        type: String,
        require:[true,'La institucion es obligatoria']
    },
    bloque:
    {
        type: Number,
        require:[true,'El bloque es obligatoria']
    },
    asistencia:
    {
        type: Boolean,
        require:[true,'El bloque es obligatoria']
    }
    
})


module.exports = model('Alumnos',AlumnosSchema);