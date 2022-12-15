/*
SmartSoft
Componente: universidadesSchema
Fecha de creacion: 30/10/2022, Autorizó: Carlos Alberto Hernández Velázquez, Carlos Ivan Angeles Reyes, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se crea el modelo de datos de las universidades que posteriormente se manda a MongoD

Numero de metodos: 1
Componentes relacionados: 
*/

const mongoose = require("mongoose");

const universidadSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true
    },
    pais:{
        type: String,
        require: true
    },
});

module.exports = mongoose.model('universidad', universidadSchema);