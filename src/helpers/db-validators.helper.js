/*
SmartSoft
Componente: mEmailExiste, mRolValido, mExisteIdModerador, mEmailExisteCoordinador, mEmailConsejeroExiste, 
mExisteIdConsejero, mEmailAuxiliarExiste, mExisteIdAuxiliar
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
validadores en base de datos, roles, id, correos

Numero de metodos: 2
Componentes relacionados: mEmailExistem:usuario.model vUsuarioModel, auxiliar.model vAuxiliarModel,
 consejero.model vConsejeroModel rol.model, vRolValido rol.model
*/

const vCoordinadorModel = require('../models/auxiliar.model')
const vAuxiliarModel = require('../models/auxiliar.model')
const vUsuarioModel = require("../models/usuario.model")
const vConsejeroModel = require('../models/consejero.model')
const vRolValido = require("../models/rol.model")

const mEmailExiste = async(correo = ' ') => {
    const vEmailExiste = await vUsuarioModel.findOne({ correo })
    if (vEmailExiste) 
    {
        throw new Error(`El email -- ${correo} -- ya existe` )
    }
}


const mEmailConsejeroExiste = async(correo = ' ') => {
    const vEmailExiste = await vConsejeroModel.findOne({ correo })
    
    if (vEmailExiste) 
    {
        throw new Error(`El email -- ${correo} -- ya existe` )
    }
}

const mEmailAuxiliarExiste = async(correo = ' ') => {
    const vAuxiliar = await vAuxiliarModel.findOne({ correo })
    console.log(vAuxiliar)
    if (vAuxiliar) 
    {
        throw new Error(`El email -- ${correo} -- ya existe` )
    }
}

const mRolValido = async(rol = " ") => {
    const vValidacionRol = await vRolValido.find({rol})
    if(!vValidacionRol)
    {
        throw new Error(`El rol {rol} no se encuentra`)
    }
}

const mExisteIdModerador = async( id ) => {
    
    const vExisteModeradorPorId = vUsuarioModel.findById( id )
    if ( !vExisteModeradorPorId )
    {
        throw new Error(`El  ${id} no existe` )
    }
}

const mExisteIdConsejero = async( id ) => {
    
    const vExisteConsejeroPorId = vConsejeroModel.findById( id )
    if ( !vExisteConsejeroPorId )
    {
        throw new Error(`El  ${id} no existe` )
    }
}

const mExisteIdAuxiliar = async( id ) => {
    
    const vExisteAuxiliarPorId = vAuxiliarModel.findById( id )
    if ( !vExisteAuxiliarPorId )
    {
        throw new Error(`El  ${id} no existe` )
    }
}

const mEmailExisteCoordinador = async( correo = '' ) => {
    const vExisteCoordinadorPorCorreo = vCoordinadorModel.findOne( { correo } )
    if ( !vExisteCoordinadorPorCorreo )
    {
        throw new Error(`El  ${correo} ya existe` )
    }
}

module.exports = {
    mEmailExiste,
    mRolValido,
    mExisteIdModerador,
    mEmailExisteCoordinador,
    mEmailConsejeroExiste,
    mExisteIdConsejero,
    mEmailAuxiliarExiste,
    mExisteIdAuxiliar
}