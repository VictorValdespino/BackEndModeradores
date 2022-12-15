/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
rutas del login

Numero de metodos: 1
Componentes relacionados: mUsuarioAuxiliarPost, mActualizarAuxiliarPut, mObtenerDatosAuxiliarGet, 
mObtMooderadoresXInstitucion, mObtConsejerosXInstitucion, mActualizarModeradorXInstitucion, mRegistrarModeradorXInstitucion, 
mRegistrarConsejeroXInstitucion,mActualizarConsejeroXInstitucion,mObtenerAuxiliaresGet auxiliar.controller

mRolValido, mEmailAuxiliarExiste, mExisteIdAuxiliar, mExisteIdModerador, mEmailExiste, mEmailConsejeroExiste,
mExisteIdConsejero db-validators.helper db-validators.helper

mValidCaracteres valid-caracteres.helper

mValidarCampos validar-campos.middleware 
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { mUsuarioAuxiliarPost, 
        mActualizarAuxiliarPut, 
        mObtenerDatosAuxiliarGet, 
        mObtMooderadoresXInstitucion, 
        mObtConsejerosXInstitucion, 
        mActualizarModeradorXInstitucion, 
        mRegistrarModeradorXInstitucion, 
        mRegistrarConsejeroXInstitucion,
        mActualizarConsejeroXInstitucion,
        mObtenerAuxiliaresGet} = require('../src/controllers/auxiliar.controller')

const { mRolValido, 
        mEmailAuxiliarExiste, 
        mExisteIdAuxiliar, 
        mExisteIdModerador, 
        mEmailExiste, 
        mEmailConsejeroExiste, 
        mExisteIdConsejero } = require('../src/helpers/db-validators.helper')

const { mValidCaracteres } = require('../src/helpers/valid-caracteres.helper')
const { mValidarCampos } = require('../src/middleware/validar-campos.middleware')

const vRouter = Router()

vRouter.post('/crear-auxiliar',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre',' longitud minima de 4 caracteres').isLength({min:4}),
    check('nombre').custom(mValidCaracteres),
    check('apellido_paterno').custom(mValidCaracteres),
    check('apellido_materno').custom(mValidCaracteres),
    check('password','la contraseña es obligatoria').isLength({min:8}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(mEmailAuxiliarExiste),
    check('rol').custom(mRolValido),
    mValidarCampos
],mUsuarioAuxiliarPost)

/**
    Actulizar datos del consejero 
*/

vRouter.put('/actualizar-auxiliar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    mValidarCampos
],mActualizarAuxiliarPut)

/**
 * obtener datos del auxiliar
*/

vRouter.get('/obtener-datos-auxiliar/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    mValidarCampos
],mObtenerDatosAuxiliarGet)

/**
 * obtener datos de los auxiliares
*/

vRouter.get('/obtener-auxiliares',mObtenerAuxiliaresGet)

/**
 * obtener datos de los moderadores x insitucion
*/

vRouter.get('/obtener-moderadores-institucion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    mValidarCampos
],mObtMooderadoresXInstitucion)

/**
 * obtener datos de los consejero x insitucion
*/

vRouter.get('/obtener-consejeros-institucion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    mValidarCampos
],mObtConsejerosXInstitucion)

/**
 * obtener datos de los auxiliares
*/

vRouter.get('/obtener-auxiliares',mObtenerAuxiliaresGet)

/**
 * Actualizar datos del moderador x insitucion
*/

vRouter.put('/actualizar-moderador-institucion/:id/moderador/:idm',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    check('id').custom(mExisteIdModerador),
    mValidarCampos
],mActualizarModeradorXInstitucion)


/**
 * Actualizar datos del consejero x insitucion
*/

vRouter.put('/actualizar-consejero-institucion/:id/consejero/:idm',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    check('id').custom(mExisteIdConsejero),
    mValidarCampos
],mActualizarConsejeroXInstitucion)

/**
 * Registrar Moderador x coordinador x institucion
 */

vRouter.post('/registrar-moderador-x-institucion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre',' longitud minima de 4 caracteres').isLength({min:4}),
    check('nombre').custom(mValidCaracteres),
    check('apellido_paterno').custom(mValidCaracteres),
    check('apellido_materno').custom(mValidCaracteres),
    check('password','la contraseña es obligatoria').isLength({min:8}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(mEmailExiste),
    check('rol').custom(mRolValido),
    mValidarCampos
],mRegistrarModeradorXInstitucion)

/**
 * Registrar Consejro x coordinador x institucion
 */

 vRouter.post('/registrar-consejero-x-institucion/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdAuxiliar),
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
],mRegistrarConsejeroXInstitucion)

module.exports = vRouter