/*
SmartSoft
Componente: vRouter
Fecha de creacion: 01/11/2022, Autorizó: Carlos Alberto Hernández Velázquez, Carlos Ivan Angeles Reyes: 

Modificaciones:
    Fecha               Folio

Descripcion:
ruta por la cual se va a obtener las universidades

Numero de metodos: 1
Componentes relacionados: mUniversidadesGet
*/
const { Router } = require('express'); 
const { mUniversidadesPost, 
        mUniversidadesGet,
        mActualizarUniversidadesPut,
        mEliminarUniversidadesDelete,
        mUnaUniversidadGet } = require('../src/controllers/universidades.controller');

const vRouter = Router();


vRouter.get('/listar-universidades', mUniversidadesGet);

vRouter.get('/listar-universidad/:id', mUnaUniversidadGet);

vRouter.post('/agregar-universidades', mUniversidadesPost);

vRouter.put('/actualizar-universidades/:id', mActualizarUniversidadesPut);

vRouter.delete('/eliminar-universidad/:id', mEliminarUniversidadesDelete);

module.exports = vRouter
