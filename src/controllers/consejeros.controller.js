/*
SmartSoft
Componente: mUsuariosPost, mCoordinadoresPost
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se desarrollan los diferentes controladores para el consejero

Numero de metodos: 2
Componentes relacionados: usuario.model vUsuario, coordinador.model vCoordinadorModel
*/
const vConsejeroModel = require('../models/consejero.model')
const vUsuarioModel = require('../models/usuario.model')
const vAuxiliarModel = require('../models/auxiliar.model')

const vBccrypyjs = require('bcryptjs');
const vBcryptjs = require('bcryptjs');

/**
 *-------------------- Consejeros --------------
 */

/*
    Agregar Consejero
*/

const mUsuarioConsejeroPost = async(req, res) => {
    
    
    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,rol }= req.body;
    
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
            const validUsuario = await vUsuarioModel.find({'correo':correo})
            console.log('user -> ',validUsuario.length)
            if (validUsuario.length >= 1) 
            {
                console.log(validUsuario)
                console.log('validando existencia en moderador')
                return res.status(400).json({
                    msg:'este usuario ya existe en otra coleccion'
                })
            }
    
        }

    const vConsejero = new vConsejeroModel(
                                    {   
                                        nombre,
                                        apellido_paterno,
                                        apellido_materno,
                                        correo,
                                        password,
                                        institucion,
                                        rol
                                    }
                                )

    const vSalt = vBcryptjs.genSaltSync()
    vConsejero.password = vBccrypyjs.hashSync(password, vSalt)

    try 
    {
        console.log("----- Endpoint registro consejerto-----")
        console.log(vConsejero)
        await vConsejero.save()

        res.status(200).json({
            msg: 'Consejero a sido registrado correctamente' ,
            vConsejero
        })
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(400).json({
            msg:'error al crear consejero'
        })
    }
    

}

/*
    Actualizar datos del consejero
*/

const mActualizarConsejeroPut = async(req, res) => {    
    
    const {id} = req.params
    const {_id,password,...resto} = req.body

    try {
        
        if ( password ) 
        {
            const salt = bcryptjs.genSaltSync();
            resto.password = bccrypyjs.hashSync( password, salt );
        }

        const vConsejero = await vConsejeroModel.findByIdAndUpdate(id,resto,{"new":true})
        
        res.status(201).json({
            msg:'Actualizacion de consejero correcta',
            vConsejero
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

const mObtenerDatosConsejeroGet = async(req, res) => {
    const {id} = req.params

    try 
    {
        const vConsejero = await vConsejeroModel.findById(id)
        console.log(vConsejero)

        res.status(202).json({
            msg:'información del consejero',
            vConsejero
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del consejero')
        return res.status(400).json({
            msg:'ocurrio un error'
        })
    }
    

}
/*
    Obtener datos de los moderadores
*/
const mObtenerDatosConsejersoGet = async(req, res) => {
    

    try 
    {
        const vConsejeros = await vConsejeroModel.find()
        console.log(vConsejeros)

        res.status(202).json({
            msg:'información del los consejeros',
            vConsejeros
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del consejero')
        return res.status(400).json({
            msg:'ocurrio un error'
        })
    }
    

}

/*
    Eliminar moderador por Id
*/
const mEliminarConsejeroDelete = async(req,res) => {
    
    const {id} = req.params
    try 
    {
        const vConsejero = vConsejeroModel.findByIdAndDelete(id)

        res.status(200).json({
            msg: 'el consejero a sido eliminado'

        })  

    } 
    catch (error) 
    {
        console.log('error al eliminar moderador')
        return res.status(400).json({
            msg:'error al eliminar consejero'
        })
    }
    

}


/**
 * Opciones especiales
*/

/** 
 * Obtener moderadores de la misma institucion
*/
const mObtMooderadoresXInstitucion = async(req, res) => {
  
    const {id} = req.params

    const vIntitucion = req.query.institucion
    console.log(vIntitucion)
    try 
    {

        const vValidarConsejero = await vConsejeroModel.findById(id)
    
        if ( !vValidarConsejero )
        {
            return res.status(400).json({
                msg: 'Consulta denegada'
            })
        }
        
        
        if ( vValidarConsejero.institucion !== vIntitucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
    
        const vObtenerModeradores = await vUsuarioModel.find({institucion:vIntitucion})
    
        res.status(200).json({
            msg:'busqueda correcta',
            vObtenerModeradores
        })
        
    } 
    catch (error) 
    {

        console.log(error)
        return res.status(500).json({
            msg:'a ocurrido un error'
        })
    }
   

}




module.exports = {

    mUsuarioConsejeroPost,
    mActualizarConsejeroPut,
    mObtenerDatosConsejeroGet,
    mObtenerDatosConsejersoGet,
    mEliminarConsejeroDelete,
    mObtMooderadoresXInstitucion
    
   

}
