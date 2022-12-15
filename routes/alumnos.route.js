/*
SmartSoft
Componente: vRouter
Fecha de creacion: 01/11/2022, Autorizó: Carlos Ivan Angeles Reyes: 

Modificaciones:
    Fecha               Folio

Descripcion:
ruta por la cual se va a obtener los alumnos

Numero de metodos: 1
Componentes relacionados: mAlumnosGet
*/
const { Router } = require('express'); 
const { mAlumnosPost,
        mAlumnosGet,
        mUnAlumnoGet,
        mActualizarAlumnosPut,
        mEliminarAlumnoDelete
         } = require('../src/controllers/alumnos.controller');

const vRouter = Router();

vRouter.post('/agregar-alumnos', mAlumnosPost);

vRouter.get('/listar-alumnos', mAlumnosGet);

vRouter.get('/listar-alumno/:id', mUnAlumnoGet);

vRouter.put('/actualizar-alumnos/:id', mActualizarAlumnosPut);

vRouter.delete('/eliminar-alumno/:id', mEliminarAlumnoDelete);

module.exports = vRouter