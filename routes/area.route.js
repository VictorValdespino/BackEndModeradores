/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
ruta por la cual se va a obtener las areas de interes

Numero de metodos: 1
Componentes relacionados: mAreaGet
*/
const { Router } = require('express'); 
const { check } = require('express-validator');
const { mAreaGet } = require('../src/controllers/areas.controller');

const vRouter = Router()

vRouter.get('/area-materia',mAreaGet)



module.exports = vRouter