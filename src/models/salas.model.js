/*
SmartSoft
Componente: salasSchema
Fecha de creacion: 01/11/2022, Autorizó: Carlos Alberto Hernández Velázquez, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se crea el modelo de datos de las salas que posteriormente se manda a MongoDB
e
Numero de metodos: 1
Componentes relacionados: 
*/

const mongoose = require("mongoose");

const salasSchema = new mongoose.Schema({
  id_tra: {
    type: Number,
    require: true,
  },
  area: {
    type: String,
    require: true,
  },
  linea: {
    type: String,
    require: true,
  },
  compartido: {
    type: Boolean,
    require: true,
  },
  no_ponentes: {
    type: Number,
    require: true,
  },
  id_pons: {
    type: String,
    require: true,
  },
  ponentes: {
    type: String,
    require: true,
  },
  instituciones: {
    type: String,
    require: true,
  },
  investigador: {
    type: String,
    require: true,
  },
  fecha: {
    type: String,
    require: true,
  },
  fecha_cierre: {
    type: String,
  },
  dia: {
    type: String,
    require: true,
  },
  turno: {
    type: String,
    require: true,
  },
  bloque: {
    type: String,
    require: true,
  },
  salon: {
    type: String,
    require: true,
  },
  ubicacion: {
    type: String,
    require: true,
  },
  sede: {
    type: String,
    require: true,
  },
  estado: {
    type: String,
    enum:['INACTIVA','ACTIVA','ESPERA']
  },
  modalidad: {
    type: String,
    require: true
  },
  url: {
    type: String,
    require: true
  },
  moderador: {
    type:String,
    default:'PENDIENTE'
  }
  });

module.exports = mongoose.model("salas", salasSchema);
