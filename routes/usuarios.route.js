/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
ruta para los moderadores

Numero de metodos: 1
Componentes relacionados: mUsuarioModeradorPost, mActualizarModeradorPut, mObtenerDatosModeradorGet, 
mEliminarModeradorDelete, mObtenerDatosModeradoresNoAceptadosGet, mObtenerDatosModeradoresAceptadosGet  moderador.controller

mEmailExiste, mRolValido, mExisteIdModerador db-validators.helper

mValidCaracteres valid-caracteres.helper

mValidarCampos validar-campos.middleware 
*/
const { Router } = require('express'); 
const { check } = require('express-validator');



const {
    mUsuarioModeradorPost,
    mActualizarModeradorPut,
    mObtenerDatosModeradorGet,
    mEliminarModeradorDelete,
    mObtenerDatosModeradoresNoAceptadosGet,
    mObtenerDatosModeradoresAceptadosGet} = require('../src/controllers/moderador.controller')

const { mEmailExiste, 
    mRolValido, 
    mExisteIdModerador } = require('../src/helpers/db-validators.helper');

const {mValidCaracteres} = require('../src/helpers/valid-caracteres.helper')
const { mValidarCampos } = require('../src/middleware/validar-campos.middleware');

const vRouter = Router()

vRouter.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('nombre',' longitud minima de 4 caracteres').isLength({min:4}),
    check('nombre').custom(mValidCaracteres),
    check('apellido_paterno').custom(mValidCaracteres),
    check('apellido_paterno').isLength({min:4}),
    check('apellido_materno').custom(mValidCaracteres),
    check('apellido_materno').isLength({min:4}),
    check('password','la contraseña es obligatoria').isLength({min:8}),
    check('correo','el correo no es valido').isEmail(),
    check('correo').custom(mEmailExiste),
    check('rol').custom(mRolValido),
    mValidarCampos
],mUsuarioModeradorPost)

/**
    Actulizar datos del moderador 
*/

vRouter.put('/actualizar-moderador/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdModerador),
    mValidarCampos
],mActualizarModeradorPut)

/**
 * obtener datos del moderador
*/

vRouter.get('/obtener-datos-moderador/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdModerador),
    mValidarCampos
],mObtenerDatosModeradorGet)

/**
 * obtener datos de los moderadores no aceptados
*/
vRouter.get('/obtener-moderador-noaceptado',mObtenerDatosModeradoresNoAceptadosGet)
/**
 * obtener datos de los moderadores aceptados
*/

vRouter.get('/obtener-moderador-aceptado',mObtenerDatosModeradoresAceptadosGet)

/**
 * Eliminar moderador de forma permanente
 */
vRouter.delete('/eliminar-moderador/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(mExisteIdModerador),
    mValidarCampos
],mEliminarModeradorDelete)



module.exports = vRouter