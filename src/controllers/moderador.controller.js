/*
SmartSoft
Componente: mUsuarioModeradorPost, mActualizarModeradorPut, mObtenerDatosModeradorGet, 
mEliminarModeradorDelete, mObtenerDatosModeradoresNoAceptadosGet, mObtenerDatosModeradoresAceptadosGet
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se desarrollan los diferentes controladores para el moderador

Numero de metodos: 2
Componentes relacionados: usuario.model vUsuario, coordinador.model vCoordinadorModel
*/

const vUsuarios = require('../models/usuario.model')
const vAuxiliarModel = require('../models/auxiliar.model')
const vConsejeroModel = require('../models/consejero.model')
const vBccrypyjs = require('bcryptjs');
const vBcryptjs = require('bcryptjs');

/**
 *-------------------- Moderadores --------------
 */

/*
    Agregar Moderadores
*/

const mUsuarioModeradorPost = async(req, res) => {
    
    
    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,
        area_interes_1,area_interes_2,rol }= req.body;

    const validAux = await vAuxiliarModel.find({'correo':correo})

    console.log('aux -> ',validAux.length)
    
    if (validAux.length >= 1) 
    {
        console.log(validAux)
        console.log('validando existencia en admin')
        return res.status(400).json({
            msg:'este usuario ya existe en otra coleccion'
        })

    }else
    {
        const validConsj = await vConsejeroModel.find({'correo':correo})
        console.log('consj -> ',validConsj.length)
        if (validConsj.length >= 1) 
        {
            console.log(validConsj)
            console.log('validando existencia en consejero')
            return res.status(400).json({
                msg:'este usuario ya existe en otra coleccion'
            })
        }

    }

    
    const vUsuario = new vUsuarios(
                                    {   nombre,
                                        apellido_paterno,
                                        apellido_materno,
                                        correo,
                                        password,
                                        institucion,
                                        area_interes_1,
                                        area_interes_2,
                                        rol
                                    }
                                )

    const vSalt = vBcryptjs.genSaltSync()
    vUsuario.password = vBccrypyjs.hashSync(password, vSalt)

    try 
    {
        console.log("----- Endpoint registro usuario -----")
        console.log(vUsuario)
        await vUsuario.save()

        res.status(200).json({
            msg: 'Moderador a sido creado correctamente' ,
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

/*
    Actualizar datos de los moderadores
*/

const mActualizarModeradorPut = async(req, res) => {    
    
    const {id} = req.params
    const {_id,password,...resto} = req.body

    try {
        
        if ( password ) 
        {
            const salt = vBcryptjs.genSaltSync();
            resto.password = vBccrypyjs.hashSync( password, salt );
        }

        const vModerador = await vUsuarios.findByIdAndUpdate(id,resto,{"new":true})
        
        res.status(201).json({
            msg:'Actualizacion de moderador correcta',
            vModerador
        })
        
    } catch (error) {
        console.log('-- error de actualizacion --')
        console.log(error)
        return res.status(400).json({
            msg:'error en la actualizacion'
        })
    }
    

}

/*
    Obtener datos del moderador Id
*/

const mObtenerDatosModeradorGet = async(req, res) => {
    const {id} = req.params

    try 
    {
        const vConsultaDataModerador = await vUsuarios.findById(id)
        console.log(vConsultaDataModerador)

        res.status(202).json({
            msg:'información del moderador',
            vConsultaDataModerador
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del moderador')
        return res.status(400).json({
            msg:'a ocurrido un error'
        })
    }
    

}

/*
    Eliminar moderador por Id
*/
const mEliminarModeradorDelete = async(req,res) => {
    
    const {id} = req.params
    try 
    {
        const vEliminarModerador = vUsuarios.findByIdAndDelete(id)

        res.status(200).json({
            msg: 'el moderador a sido eliminado'

        })  

    } 
    catch (error) 
    {
        console.log('error al eliminar moderador')
        return res.status(400).json({
            msg:'error al eliminar usuario'
        })
    }
    

}

/**
 * Obtener datos de los moderadores aceptados y no aceptados
*/


/**
 * Moderadores no aceptados
 */

const mObtenerDatosModeradoresNoAceptadosGet = async(req, res) => {
    const query = {estado:false}

    try 
    {
        const vConsultaDataModerador = await vUsuarios.find(query)
        console.log(vConsultaDataModerador)

        res.status(202).json({
            msg:'información de los moderadores no aceptados',
            vConsultaDataModerador
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del moderador')
        return res.status(400).json({
            msg:'a ocurrido un error'
        })
    }
    

}

/**
 * Moderadores  aceptados
 */

const mObtenerDatosModeradoresAceptadosGet = async(req, res) => {
    const query = {estado:true}

    try 
    {
        const vConsultaDataModerador = await vUsuarios.find(query)
        console.log(vConsultaDataModerador)

        res.status(202).json({
            msg:'información de los moderadores  aceptados',
            vConsultaDataModerador
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del moderador')
        return res.status(400).json({
            msg:'a ocurrido un error'
        })
    }
    

}


module.exports = {
    mUsuarioModeradorPost,
    mActualizarModeradorPut,
    mObtenerDatosModeradorGet,
    mEliminarModeradorDelete,
    mObtenerDatosModeradoresNoAceptadosGet,
    mObtenerDatosModeradoresAceptadosGet

}

