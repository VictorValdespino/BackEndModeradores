/*
SmartSoft
Componente: vRouter
Fecha de creacion: 01/11/2022, Autorizó: Carlos Alberto Hernández Velázquez, Revisó: 

Modificaciones:
    Fecha               Folio

Descripción:
Archivo de ruta para las salas

Numero de metodos: 1
Componentes relacionados: Componentes: mSalasPost, mSalasGet, mUnaSalaGet, mActualizarSalasPut, meliminarSalasDelete
*/

const { Router } = require('express');

const { mSalasPost,
        mSalasGet,
        mUnaSalaGet,
        mActualizarSalasPut,
        meliminarSalasDelete, 
        mMatchSalas,
        mAsignarSalas} = require('../src/controllers/salas.controller');

const vRouter = Router();

vRouter.post('/crear-salas', mSalasPost);

//vRouter.post('/crear-salas-arr', mSalaArrayPost);

vRouter.get('/obtener-salas', mSalasGet);

vRouter.get('/obtener-una-sala/:id', mUnaSalaGet);

vRouter.get('/asignar-salas', mAsignarSalas);

vRouter.put('/actualizar-sala/:id', mActualizarSalasPut);

vRouter.delete('/eliminar-sala/:id', meliminarSalasDelete);

//vRouter.get('/match',mMatchSalas)

module.exports = vRouter