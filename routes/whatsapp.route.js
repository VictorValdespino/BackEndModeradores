/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
ruta para la url de whatsapp

Numero de metodos: 1
Componentes relacionados: mRegistrarWhatsPost, mObtnerWhatsPost, mActualizarWhatsPut whatsapp.controller

*/

const { Router } = require('express')
const { check } = require('express-validator')
const { mActualizarUrlManualPut } = require('../src/controllers/manual.controller')
const {mRegistrarWhatsPost, mObtnerWhatsPost, mActualizarWhatsPut} = require('../src/controllers/whatsapp.controller')



const vRouter = Router()

vRouter.post('/whats-url',mRegistrarWhatsPost)

vRouter.get('/obtener-url',mObtnerWhatsPost)

vRouter.put('/actualizar-whats-url/:id',[
    check('id','no es un id valido').isMongoId()
],mActualizarWhatsPut)

module.exports = vRouter