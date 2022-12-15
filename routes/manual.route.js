/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
rutas de la url del manual

Numero de metodos: 1
mActualizarUrlManualPut, mObtenerUrlManualGet, mRegistrarUrlManualPost manual.controller
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { mActualizarUrlManualPut, mObtenerUrlManualGet, mRegistrarUrlManualPost } = require('../src/controllers/manual.controller')




const vRouter = Router()

vRouter.post('/manual-url',mRegistrarUrlManualPost)

vRouter.get('/manual-obtener-url',mObtenerUrlManualGet)

vRouter.put('/actualizar-manual-url/:id',[
    check('id','no es un id valido').isMongoId()
],mActualizarUrlManualPut)

module.exports = vRouter