/*
SmartSoft
Componente: vRouter
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
rutas del login

Numero de metodos: 1
Componentes relacionados: mLogin, mLoginAuxiliar, mLoginConsejero, mLoginAdmin, 
mForgotPasswordAdmin, mForgotPasswordAux, mForgotPasswordConsj  auth.controller
*/

const { Router } = require('express')
const { check } = require('express-validator')
const { mLogin, mLoginAuxiliar, mLoginConsejero, mLoginAdmin, mForgotPasswordAdmin, mForgotPasswordAux, mForgotPasswordConsj, mRestGen } = require('../src/controllers/auth.controller')
const { mEmailExiste } = require('../src/helpers/db-validators.helper')
const { mValidarJWT } = require('../src/middleware/validar-jwt.middleware')
const { mForgotPassword } = require('../src/controllers/auth.controller')
const { mValidarCampos } = require('../src/middleware/validar-campos.middleware')

const vRouter = Router()

vRouter.post('/login',[
    check('correo','Correo es necesario').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
        
],mLogin)

vRouter.post('/login/consejero',[
    check('correo','Correo es necesario').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    
],mLoginConsejero)

vRouter.post('/login/coordinador',[
    check('correo','Correo es necesario').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    
],mLoginAuxiliar)
vRouter.post('/login/admin',[
    check('correo','Correo es necesario').isEmail(),
    check('password','la contraseña es obligatoria').not().isEmpty(),
    
],mLoginAdmin)

//se olvido contraseña
vRouter.put('/reset-password',[
    check('correo','es obligatorio').isEmail()
],mForgotPassword)

vRouter.put('/reset-password-admin',[
    check('correo','es obligatorio').isEmail(),
],mForgotPasswordAdmin)

vRouter.put('/reset-password-aux',[
    check('correo','es obligatorio').isEmail(),
],mForgotPasswordAux)

vRouter.put('/reset-password-consj',[
    check('correo','es obligatorio').isEmail(),
],mForgotPasswordConsj)

vRouter.put('/reset-gen',[
    check('correo','es obligatorio').isEmail(),
],mRestGen)
/*
vRouter.put('/login-gen',[
    check('correo','es obligatorio').isEmail(),
],mRestGen)*/

module.exports = vRouter