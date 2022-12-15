/*
SmartSoft
Componentes: mUniversidadesPost, mUniversidadesGet, mUnaUniversidadGet, mActualizarUniversidadesPut, meliminarUniversidadesDelete
Fecha de creacion: 30/10/2022, Autorizó: Carlos Alberto Hernández Velázquez, Carlos Ivan Angeles Reyes, Revisó: 

Modificaciones:
    Fecha               Folio

Descripción:
mUniveridadesPost agrega nuevas universidades
mUniversidadesGet obtiene todas las universidades
mUnUaniversidadGet obtiene una universidad
mActualizarUniversidadesPut actualiza las universidades
mEliminarUniversidadesDelete borra una universidad

Numero de metodos: 1
Componentes relacionados: alumnos.model, alumnos.route
*/

const { response } = require("express");
const universidadSchema = require("../models/universidades.model");

//crear las universidades
const mUniversidadesPost = async (req, res) => {
  const { nombre, pais } = req.body;
  const vUniversidades = new universidadSchema({ nombre, pais });
  await vUniversidades.save();
  res.json({
    msg: "POST - API universidades - endpoint universidades- controller",
    vUniversidades,
  });
};

//obtener las universidades
const mUniversidadesGet = async (req, res = response) => {
  try {
    const vUniversidad = await universidadSchema.find();
    res.status(201).json(vUniversidad);
  } catch (error) {}
};

//obtener una universidad
const mUnaUniversidadGet = async (req, res = response) => {
  const { id } = req.params
  try {
    const vUniversidad = await universidadSchema.findById({ _id : id });
    res.status(201).json(vUniversidad);
  } catch (error) {}
};

//actualizar universidades
const mActualizarUniversidadesPut = async(req, res) => {

    const {id} = req.params
    
    const {nombre, pais} = req.body

    try {

        const vUniversidad = await universidadSchema.findByIdAndUpdate({ _id: id }, { $set: { nombre, pais } });
        
        return res.json({
            msg:'Actualización de universidad',
            vUniversidad
        })
        
    } catch (error) {
        console.log('-- Error de actualización --')
        console.log(error)
    }
}

//eliminar universidades
const mEliminarUniversidadesDelete = async(req, res) => {

  const {id} = req.params

  try {

      const vUniversidad = await universidadSchema.findByIdAndDelete({ _id: id });
      
      return res.json({
          msg:'Eliminación de universidad',
          vUniversidad
      })
      
  } catch (error) {
      console.log('-- error de actualización --')
      console.log(error)
  }  
}

module.exports = {
  mUniversidadesPost,
  mUniversidadesGet,
  mActualizarUniversidadesPut,
  mEliminarUniversidadesDelete,
  mUnaUniversidadGet
};
