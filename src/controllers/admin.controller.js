/*
SmartSoft
Componente: mEliminarTodo, mCrearAdmin, mObtenerAdmin, mRegistroEspontaneo
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se desarrollan los controladores especificos para ciertas acciones que va a realizar el admin

Numero de metodos: 
Componentes relacionados: usuario.model vUsuarioModel, axiliar.model vAuxiliarModel,
 consejero.model vConsejeroModel, super-admin.model vAdminModel
*/
const vAdminModel = require('../models/super-admin.model')
const vUsuarioModel = require('../models/usuario.model')
const vConsejeroModel = require('../models/consejero.model')
const vSalasModel = require("../models/salas.model");
const vBccrypyjs = require('bcryptjs');
const vBcryptjs = require('bcryptjs');
const { response } = require('express');

const mEliminarTodo = async(req,res) => {
    try {
        
        await vUsuarioModel.deleteMany()
        await vSalasModel.deleteMany()
        res.status(200).json({
            msg:'se elimino todo'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'error al eliminar'})
    }
    
} 

const mCrearAdmin = async(req,res) => {

    const { nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            password} = req.body
    

    const vAdmin = new vAdminModel(
        {   nombre,
            apellido_paterno,
            apellido_materno,
            correo,
            password
        }
    )

    const vSalt = vBcryptjs.genSaltSync()
    vAdmin.password = vBccrypyjs.hashSync(password, vSalt)

    try {

        console.log("----- Endpoint registro admin -----")
        await vAdmin.save()

        res.status(200).json({
            msg:'Resgistrado'
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'algo salio mal'})
    }
}

const mObtenerAdmin = async(req,res) => {
    try {
        
        const vAdmin = await vAdminModel.find()

        res.status(200).json(vAdmin)

    } catch (error) {

        console.log(error)
        return res.status(400).json({msg:'algo salio mal'})
        
    }
}

const mRegistroEspontaneo = async(req, res) => {
    
    
    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,
        area_interes_1,area_interes_2,rol,estado,salas }= req.body;
    const vUsuario = new vUsuarioModel(
                                    {  
                                        nombre,
                                        apellido_paterno,
                                        apellido_materno,
                                        correo,
                                        password,
                                        institucion,
                                        area_interes_1,
                                        area_interes_2,
                                        rol,
                                        estado,
                                        salas
                                    }
                                )

    const vSalt = vBcryptjs.genSaltSync()
    vUsuario.password = vBccrypyjs.hashSync(password, vSalt)

    try 
    {
        console.log("----- Endpoint registro espontaneo -----")
        console.log(vUsuario)
        await vUsuario.save()

        res.status(200).json({
            msg: 'Registro espontaneo a sido creado correctamente' ,
            vUsuario
        })
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(400).json({
            msg:'error al crear usuario'
        })
    }
    

}

const mActualizarAdminPut = async(req, res) => {    
    
    const {id} = req.params
    const {_id,__v,password,...resto} = req.body


    try {
        
        if ( password ) 
        {
            const salt = bcryptjs.genSaltSync();
            resto.password = bccrypyjs.hashSync( password, salt );
        }

        const vAdmin = await vAdminModel.findByIdAndUpdate(id,resto,{"new":true})
        
    
        res.status(201).json({
            msg:'Actualizacion de admin correcta',
            vAdmin
            
        })
        
    } catch (error) {
        console.log('-- error de actualizacion --')
        console.log(error)
        return res.status(400).json({
            msg:'error en la actualizacion'
        })
    }
    

}
module.exports = {
    mEliminarTodo,
    mCrearAdmin,
    mObtenerAdmin,
    mRegistroEspontaneo,
    mActualizarAdminPut
}