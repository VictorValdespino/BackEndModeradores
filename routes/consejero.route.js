/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
rutas de los consejeros

Numero de metodos: 1
mUsuarioConsejeroPost, mActualizarConsejeroPut, mObtenerDatosConsejeroGet, mEliminarConsejeroDelete,  mObtenerDatosConsejersoGet consejeros.controller

mEmailConsejeroExiste, mRolValido, mExisteIdConsejero db-validators.helper

mValidCaracteres valid-caracteres.helper

mValidarCampos validar-campos.middleware 
*/


const { Router } = require('express')
const { check } = require('express-validator')

const { mUsuarioConsejeroPost,
        mActualizarConsejeroPut,
        mObtenerDatosConsejeroGet,
        mEliminarConsejeroDelete, 
        mObtenerDatosConsejersoGet,
        mObtMooderadoresXInstitucion} = require('../src/controllers/consejeros.controller')

const { mEmailConsejeroExiste,
        mRolValido,
        mExisteIdConsejero } = require('../src/helpers/db-validators.helper')

const {mValidCaracteres} = require('../src/helpers/valid-caracteres.helper')

const { mValidarCampos } = require('../src/middleware/validar-campos.middleware')

const vRouter = Router()

vRouter.post('/crear-consejero',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre',' longitud minima de 4 caracteres').isLength({min:4}),
    check('nombre').custom(mValidCaracteres),
    check('apellido_paterno').custom(mValidCaracteres),
    check('apellido_materno').custom(mValidCaracteres),
    check('password','la contraseña es obligatoria').isLength({min:8}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(mEmailConsejeroExiste),
    check('rol').custom(mRolValido),
    mValidarCampos
],mUsuarioConsejeroPost)

/**
    Actulizar datos del consejero 
*/

vRouter.put('/actualizar-consejero/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdConsejero),
    mValidarCampos
],mActualizarConsejeroPut)

/**
 * obtener datos del consejero
*/

vRouter.get('/obtener-datos-consejero/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdConsejero),
    mValidarCampos
],mObtenerDatosConsejeroGet)

vRouter.get('/obtener-datos-consejeros',mObtenerDatosConsejersoGet)

vRouter.get('/obtener-moderadores-institucion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdConsejero),
    mValidarCampos
],mObtMooderadoresXInstitucion)

module.exports = vRouter



