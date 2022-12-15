/*
SmartSoft
Componentes: mSalasPost, mSalasGet, mUnaSalaGet, mActualizarSalasPut, meliminarSalasDelete
Fecha de creacion: 01/11/2022, Autorizó: Carlos Alberto Hernández Velázquez, Revisó: 

Modificaciones:
    Fecha               Folio

Descripción:
mSalasPost agrega nuevas salas
mSalasGet obtiene todas las salas
mUnaSalaGet obtiene una sala
mActualizarSalasPut actualiza las salas
meliminarSalasDelete borra una sala

Numero de metodos: 1
Componentes relacionados: salas.model, salas.route
*/


const { response } = require("express");
const salasSchema = require("../models/salas.model");
const { validar_salas } = require("../helpers/validar_salas");
const vUsuarioModel = require('../models/usuario.model')
const moderadoresSchema = require("../models/usuario.model");
const auxiliarSchema = require("../models/auxiliar.model");
const consejeroSchema = require("../models/consejero.model")
const asignacionSchema = require("../models/asignacion.model")

/*
const mSalaArrayPost = async(req,res){

  const vNewSala = req.body
  
  const vSalaArr = new salasSchema(vNewSala)

  await vSalaArr.save()

}*/

//crear las salas
const mSalasPost = async (req, res) => {
  const vSalas = new salasSchema();
  await salasSchema.insertMany(req.body).then((vSalas) => {
    res.status(200).send(vSalas)
  }).catch((error) => {
    res.status(400).send(error)
  })
};




//obtener las salas
const mSalasGet = async (req, res = response) => {
  try {
    const vSalas = await salasSchema.find();
    res.status(201).json(vSalas);
  } catch (error) {}
};

//obtener una sala
const mUnaSalaGet = async (req, res = response) => {
  const { id } = req.params
  try {
    const vSalas = await salasSchema.findById({ _id : id });
    res.status(201).json(vSalas);
  } catch (error) {}
};

//actualizar salas
const mActualizarSalasPut = async(req, res) => {

  const {id} = req.params
  
  const {
    id_tra,
    area,
    linea,
    compartido,
    no_ponentes,
    id_pons,
    ponentes,
    instituciones,
    investigador,
    fecha,
    fecha_cierre,
    dia,
    turno,
    bloque,
    salon,
    ubicacion,
    sede,
    estado,
    modalidad,
    url,
    moderador
  } = req.body;
  console.log(req.body)
  console.log(fecha_cierre)
  try {

      const vSalas = await salasSchema.findByIdAndUpdate({ _id: id }, { $set: { 
        id_tra,
        area,
        linea,
        compartido,
        no_ponentes,
        id_pons,
        ponentes,
        instituciones,
        investigador,
        fecha,
        fecha_cierre,
        dia,
        turno,
        bloque,
        salon,
        ubicacion,
        sede,
        estado,
        modalidad,
        url,
        moderador}});

        console.log(vSalas)
      
      return res.json({
          msg:'Actualización de salas',
          vSalas
      })
      
  } catch (error) {
      console.log('-- error de actualización --')
      console.log(error)
  }  
};

//eliminar salas
const meliminarSalasDelete = async(req, res) => {

  const {id} = req.params

  try {

      const vSalas = await salasSchema.findByIdAndDelete({ _id: id });
      
      return res.json({
          msg:'Eliminación de salas',
          vSalas
      })
      
  } catch (error) {
      console.log('-- error de actualización --')
      console.log(error)
  }  
};

const mGetModeradores = async() => {
  let vModeradores = await vUsuarioModel.find()
  return vModeradores
}

const mGetSalas = async() => {
  let vGetSalas = await salasSchema.find()
  return vGetSalas
}



const mAsignarSalas = async (req, res) => {
  //Salas schema
  const vSalas = await salasSchema.find();
  const SalasAntiguas = vSalas;
  //Auxiliar schema
  const vAuxiliar = await auxiliarSchema.find();
  //console.log(vAuxiliar)
  //Moderador schema
  const vModeradores = await moderadoresSchema.find();
  //console.log(vModeradores)
  //Consejero schema
  const vConsejero = await consejeroSchema.find();
  //console.log(vConsejero)

  //Eliminar salas anteriores
  const eliminacion = await salasSchema.deleteMany();

  try {
    //Concatenamos los JSON en uno solo
    let usuariosF = vAuxiliar.concat(vModeradores, vConsejero);


    
    //se hace match
    for (let i = 0; i < vAuxiliar.length; i++) {
      for (let index = 0; index < SalasAntiguas.length; index++) {
        if (
          usuariosF[i].area_interes_1 == SalasAntiguas[index].area ||
          usuariosF[i].area_interes_2 == SalasAntiguas[index].area
        ) {
          SalasAntiguas[index].moderador = usuariosF[i]._id;
          console.log('estoy asignando')
        } else {
          SalasAntiguas[index].moderador = "Sin asignar";
          console.log('no asigno nada')
        }
      }
    }

    await salasSchema
      .insertMany(SalasAntiguas)
      .then((SalasAntiguas) => {
        res.status(201).send({
          msg: "Asignación realizada"
        });
      })
      .catch((error) => {
        res.status(error).send(error);
      });
  } catch (error) {}
  
}




module.exports = {
    mSalasPost,
    mSalasGet,
    mUnaSalaGet,
    mActualizarSalasPut,
    meliminarSalasDelete,
    mAsignarSalas
  };
  
