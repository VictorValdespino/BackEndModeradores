/*
SmartSoft
Componentes: mSalasPost, mSalasGet, mUnaSalaGet, mActualizarSalasPut, meliminarSalasDelete
Fecha de creacion: 01/11/2022, Autorizó: Carlos Ivan Angeles Reyes, Revisó: 

Modificaciones:
    Fecha               Folio

Descripción:
mAlumnosPost agrega nuevos alumnos
mAlumnosGet obtiene todos los alumnos
mUnAlumnoGet obtiene un alumno
mActualizarAlumnosPut actualiza los alumnos
mEliminarAlumnoDelete borra un alumno

Numero de metodos: 1
Componentes relacionados: alumnos.model, alumnos.route
*/
const { response } = require("express");
const alumnosSchema = require("../models/alumnos.model");

//crear los alumnos
const mAlumnosPost = async (req, res) => {
  const { nombre_alumno, institucion_alumno, bloque, asistencia } = req.body;
  const vAlumnos = new alumnosSchema({ nombre_alumno, institucion_alumno, bloque, asistencia });
  await vAlumnos.save();
  res.json({
    msg: "POST - API alumnos - endpoint alumnos-controller",
    vAlumnos,
  });
};

//obtener las alumnos
const mAlumnosGet = async (req, res = response) => {
  try {
    const vAlumnos = await alumnosSchema.find();
    res.status(201).json(vAlumnos);
  } catch (error) {}
};

//obtener una alumno
const mUnAlumnoGet = async (req, res = response) => {
  const { id } = req.params
  try {
    const vAlumno = await alumnosSchema.findById({ _id : id });
    res.status(201).json(vAlumno);
  } catch (error) {}
};

//actualizar alumnos
const mActualizarAlumnosPut = async(req, res) => {

    const {id} = req.params
    
    const {nombre_alumno, institucion_alumno, bloque, asistencia} = req.body

    try {

        const vAlumnos = await alumnosSchema.findByIdAndUpdate({ _id: id }, { $set: { nombre_alumno, institucion_alumno, bloque, asistencia } });
        
        return res.json({
            msg:'Actualización de alumno',
            vAlumnos
        })
        
    } catch (error) {
        console.log('-- Error de actualización --')
        console.log(error)
    }
}

//eliminar alumno
const mEliminarAlumnoDelete = async(req, res) => {

  const {id} = req.params

  try {

      const vAlumno = await alumnoSchema.findByIdAndDelete({ _id: id });
      
      return res.json({
          msg:'Eliminación de alumno',
          vUniversidad
      })
      
  } catch (error) {
      console.log('-- error de eliminacion --')
      console.log(error)
  }  
}

module.exports = {
    mAlumnosPost,
    mAlumnosGet,
    mUnAlumnoGet,
    mActualizarAlumnosPut,
    mEliminarAlumnoDelete
};