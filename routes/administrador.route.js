/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
rutas de el admin

Numero de metodos: 1
Componentes relacionados: mEliminarTodo, mCrearAdmin, mObtenerAdmin, mRegistroEspontaneo admin.controller
*/

const { Router } = require('express'); 
const { check } = require('express-validator');
const { mEliminarTodo, mCrearAdmin, mObtenerAdmin, mRegistroEspontaneo, mActualizarAdminPut } = require('../src/controllers/admin.controller');


const vRouter = Router()

vRouter.delete('/eliminar-todo',mEliminarTodo)

vRouter.post('/agregar',mCrearAdmin)

vRouter.get('/obtener',mObtenerAdmin)

vRouter.post('/espontaneo',mRegistroEspontaneo)

vRouter.put('/actualizar/:id',mActualizarAdminPut)

module.exports = vRouter