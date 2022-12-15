/*
SmartSoft
Componente: mUsuarioAuxiliarPost, mActualizarAuxiliarPut, mObtenerDatosAuxiliarGet, mObtenerAuxiliaresGet, mObtMooderadoresXInstitucion,
    mObtConsejerosXInstitucion, mActualizarModeradorXInstitucion, mActualizarConsejeroXInstitucion, mRegistrarModeradorXInstitucion, 
    mRegistrarConsejeroXInstitucion

Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se tienen los diferentes controladores que ayudaran a realizar las diferentes acciones del auxiliar

Numero de metodos: 2
Componentes relacionados: usuario.model vUsuarioModel, auxiliar.model vAuxiliarModel,
 consejero.model vConsejeroModel
*/
const vAuxiliarModel = require('../models/auxiliar.model')
const vUsuarioModel = require('../models/usuario.model')
const vConsejeroModel = require('../models/consejero.model')
const vBccrypyjs = require('bcryptjs');
const vBcryptjs = require('bcryptjs');

/**
 *-------------------- Auxiliar --------------
 */
/*
    Agregar Consejero
*/

const mUsuarioAuxiliarPost = async(req, res) => {
    
    
    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,
        area_interes_1,area_interes_2,rol }= req.body;

        const validConsejero = await vConsejeroModel.find({'correo':correo})

        console.log('consejero -> ',validConsejero.length)
        
        if (validConsejero.length >= 1) 
        {
            console.log(validConsejero)
            console.log('validando existencia en consejero')
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

    const vAuxiliar = new vAuxiliarModel(
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
    vAuxiliar.password = vBccrypyjs.hashSync(password, vSalt)

    try 
    {
        console.log("----- Endpoint registro de auxiliar -----")
        console.log(vAuxiliar)
        await vAuxiliar.save()

        res.status(200).json({
            msg: 'Auxiliar a sido creado correctamente' ,
            vAuxiliar
        })
    } 
    catch (error) 
    {
        console.log(error)
        return res.status(400).json({
            msg:'error al crear auxiliar'
        })
    }
    

}

/*
    Actualizar datos del Auxiliar
*/

const mActualizarAuxiliarPut = async(req, res) => {    
    
    const {id} = req.params
    const {_id,password,...resto} = req.body

    try {
        
        if ( password ) 
        {
            const salt = vBccrypyjs.genSaltSync();
            resto.password = vBcryptjs.hashSync( password, salt );
        }
        console.log("--reset contraseña --")
        console.log(resto)

        const vAuxiliar = await vAuxiliarModel.findByIdAndUpdate(id,resto,{"new":true})
        
        console.log("->",vAuxiliar)

        res.status(200).json({
            msg:'Actualizacion de auxiliar correcta',
            vAuxiliar
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
    Obtener datos del auxiliar Id
*/

const mObtenerDatosAuxiliarGet = async(req, res) => {
    const {id} = req.params

    try 
    {
        const vAuxiliar = await vAuxiliarModel.findById(id)
        console.log(vAuxiliar)

        res.status(202).json({
            msg:'información del auxiliar',
            vAuxiliar
        })

    } 
    catch (error) 
    {
        console.log('error al consultar informacion del auxiliar')
        return res.status(400).json({
            msg:'ocurrio un error'
        })
    }
    

}

/*
    Obtener datos de los auxiliares
*/

const mObtenerAuxiliaresGet = async(req, res) => {
    const {id} = req.params

    try 
    {
        const vAuxiliar = await vAuxiliarModel.find()
        console.log(vAuxiliar)

        res.status(202).json({
            msg:'Datos de los axiliares',
            vAuxiliar
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

/** 
 * Obtener moderadores de la misma institucion
*/
const mObtMooderadoresXInstitucion = async(req, res) => {
  
    const {id} = req.params

    const vIntitucion = req.query.institucion

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
    
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Consulta denegada'
            })
        }
        
        
        if ( vValidarAuxiliar.institucion !== vIntitucion  ) 
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


/** 
 * Obtener consejeros de la misma institucion
*/
const mObtConsejerosXInstitucion = async(req, res) => {
  
    const {id} = req.params

    const vIntitucion = req.query.institucion

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
    
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Consulta denegada'
            })
        } 
        
        if ( vValidarAuxiliar.institucion !== vIntitucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
    
        const vObtenerConsejeros = await vConsejeroModel.find({institucion:vIntitucion})

        if ( !vObtenerConsejeros ) {

            return res.status(400).json({
                msg: 'No se han encontrado consejeros'
            })

        }
    
        res.status(200).json({
            msg:'busqueda correcta',
            vObtenerConsejeros 
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

/** 
 * Actualizar moderador de la misma institucion
*/
const mActualizarModeradorXInstitucion = async(req, res) => {
  
    const {id,idm} = req.params
    
    const vIntitucion = req.query.institucion

    const {_id,password,...resto} = req.body

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
        console.log(vValidarAuxiliar)
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Actualizacion denegada'
            })
        } 
        
        if ( vValidarAuxiliar.institucion !== vIntitucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
        
        if ( password ) 
        {
            const salt = bcryptjs.genSaltSync();
            resto.password = bccrypyjs.hashSync( password, salt );
        }
        console.log(idm)
        const vActualizarModerador = await vUsuarioModel.findByIdAndUpdate(idm,resto,{"new":true})
        console.log(vActualizarModerador)
        if ( !vActualizarModerador ) 
        {

            return res.status(400).json({
                msg: 'No se han encontrado moderador'
            })

        }
    
        res.status(200).json({
            msg:'Moderador actualizado correctamente',
            vActualizarModerador 
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

/** 
 * Actualizar consejero de la misma institucion
*/
const mActualizarConsejeroXInstitucion = async(req, res) => {
  
    const {id,idm} = req.params
    
    const vIntitucion = req.query.institucion

    const {_id,password,...resto} = req.body

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
        console.log(vValidarAuxiliar)
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Actualizacion denegada'
            })
        } 
        
        if ( vValidarAuxiliar.institucion !== vIntitucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
        
        if ( password ) 
        {
            const salt = bcryptjs.genSaltSync();
            resto.password = bccrypyjs.hashSync( password, salt );
        }
        console.log(idm)
        const vActualizarConsejero = await vConsejeroModel.findByIdAndUpdate(idm,resto,{"new":true})
        console.log(vActualizarConsejero)
        if ( !vActualizarConsejero ) 
        {

            return res.status(400).json({
                msg: 'No se han encontrado moderador'
            })

        }
    
        res.status(200).json({
            msg:'Consejero actualizado correctamente',
            vActualizarConsejero 
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

/** 
 * Registrar moderador de la misma institucion
*/
const mRegistrarModeradorXInstitucion = async(req, res) => {
  
    const {id} = req.params
    
    //const vIntitucion = req.query.institucion

    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,
        area_interes_1,area_interes_2,estado,rol }= req.body;

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
        console.log(vValidarAuxiliar)
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Actualizacion denegada'
            })
        } 
        
        if ( vValidarAuxiliar.institucion !== institucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
        
        
        const vUsuario = new vUsuarioModel(
                                        {   nombre,
                                            apellido_paterno,
                                            apellido_materno,
                                            correo,
                                            password,
                                            institucion,
                                            area_interes_1,
                                            area_interes_2,
                                            estado,
                                            rol
                                        }
                                    )
                                        
        const vSalt = vBcryptjs.genSaltSync()
        vUsuario.password = vBccrypyjs.hashSync(password, vSalt)

        await vUsuario.save()
        
    
        res.status(200).json({
            msg:'Moderador registrado correctamente',
            vUsuario 
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


/** 
 * Registrar moderador de la misma institucion
*/

const mRegistrarConsejeroXInstitucion = async(req, res) => {
  
    const {id} = req.params
    
    //const vIntitucion = req.query.institucion

    const { nombre, apellido_paterno, apellido_materno, 
        correo, password, institucion,rol }= req.body;

    try 
    {

        const vValidarAuxiliar = await vAuxiliarModel.findById(id)
        
        if ( !vValidarAuxiliar )
        {
            return res.status(400).json({
                msg: 'Actualizacion denegada'
            })
        } 
      
        if ( vValidarAuxiliar.institucion !== institucion  ) 
        {
            return res.status(400).json({
                msg: 'No pertenecen a la misma institucion'
            })
        }
        
        const vExiteUnConsejero = await vConsejeroModel.find({institucion})

        if ( vExiteUnConsejero.length >= 1 )
        {
            return res.status(400).json({
                msg: `Ya existe un consejero de la misma insitucion ${institucion}`
            }) 
        }

        const vConsejro = new vConsejeroModel(
                                        {   nombre,
                                            apellido_paterno,
                                            apellido_materno,
                                            correo,
                                            password,
                                            institucion,
                                            rol
                                        }
                                    )
                                        
        const vSalt = vBcryptjs.genSaltSync()
        
        

        vConsejro.password = vBccrypyjs.hashSync(password, vSalt)

        await vConsejro.save()
        
        res.status(200).json({
            msg:'Consejero registrado correctamente',
            vConsejro 
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
    mUsuarioAuxiliarPost,
    mActualizarAuxiliarPut,
    mObtenerDatosAuxiliarGet,
    mObtenerAuxiliaresGet,
    mObtMooderadoresXInstitucion,
    mObtConsejerosXInstitucion,
    mActualizarModeradorXInstitucion,
    mActualizarConsejeroXInstitucion,
    mRegistrarModeradorXInstitucion,
    mRegistrarConsejeroXInstitucion
}