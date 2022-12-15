/*
SmartSoft
Componente: mLogin, mLoginAuxiliar, mLoginConsejero, mLoginAdmin, mForgotPassword,
mForgotPasswordAdmin, mForgotPasswordAux, mForgotPasswordConsj,
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se desarrollan los metodos para el login de los deifrentes usuarios

Numero de metodos: 
Componentes relacionados: usuario.model vUsuarioModel, auxiliar.model vAuxiliarModel,
 consejero.model vConsejeroModel, super-admin.model vAdminModel
*/

const vBccrypyjs = require('bcryptjs');
const vBcryptjs = require('bcryptjs');
const vGenerator = require('generate-password')
const { response } = require("express");
const { json } = require("express/lib/response");
const { mGenerarJWT } = require("../helpers/generar-jwt.helper");
const vUsuarioModel = require('../models/usuario.model')
const vAuxiliarModel = require('../models/auxiliar.model')
const vConsejeroModel = require('../models/consejero.model')
const vAdminModel = require('../models/super-admin.model')

const mLogin = async(req, res = response) => {
    const {correo,password} = req.body

    try {
        
        const vUsuario = await  vUsuarioModel.findOne({correo})
        console.log(vUsuario)
        
        if (!vUsuario) 
        {
            return res.status( 400 ).json({
                msg: 'Usuario / Contraseña incorrectos'
            }); 
        }     

        if ( !vUsuario.estado  )
        {
            
            return res.status( 400 ).json({
                msg: 'No tiene autorizacion'
            });
        }
       
        console.log(vUsuario.password)            
        const  validPassword = vBcryptjs.compareSync( password, vUsuario.password );
        if( !validPassword )
        { 

            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrectos'
                }
            );

        }
        console.log("---- login ---")
        console.log("---- Moderador ---")
        // ----------- Generar el JWT
        //const vToken = await mGenerarJWT(vUsuario.id)
        res.status(200).json({msg:'Inicio de sesion correcto',vUsuario,validUser:true})
        

                 
       
        
    } catch (error) {
        return res.status(500).json({
            msg:'algo salio mal' 
        });
    }
}

const mLoginAuxiliar = async( req, res = response ) => {

    const {correo,password} = req.body
    console.log(correo," -- ",password)
    
    try {
        
        console.log("---- login ---")
        console.log("---- Coordinador ---")

        const vAuxiliar = await  vAuxiliarModel.findOne({correo})
        console.log(vAuxiliar)
        
        if (!vAuxiliar) 
        {
            return res.status( 400 ).json({
                msg: 'Usuario / Contraseña incorrectos'
            }); 
        }
        
        if ( !vAuxiliar.estado  )
        {
            return res.status( 400 ).json({
                msg: 'No tiene autorizacion'
            });
        }
                  
        const  validPassword = vBcryptjs.compareSync( password, vAuxiliar.password );
        if( !validPassword )
        { 

            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrectos'
                }
            );

        }
        

        // ----------- Generar el JWT
        //const vToken = await mGenerarJWT(vCoordinador.id)

        res.json({
            msg:'Inicio de sesion correcto',
            vAuxiliar,
            validUser:true
        });

        
    }catch (error) {
        return res.status(500).json({
            msg:'algo salio mal'
        });
    }       
    

        
}

const mLoginConsejero = async( req, res = response ) => {

    const {correo,password} = req.body
    console.log(correo," -- ",password)
    
    try {
        
        console.log("---- login ---")
        console.log("---- Consejero ---")

        const vConsejero = await  vConsejeroModel.findOne({correo})
        console.log(vConsejero)
        
        if (!vConsejero) 
        {
            return res.status( 400 ).json({
                msg: 'Usuario / Contraseña incorrectos'
            }); 
        }
        
        if ( !vConsejero.estado  )
        {
            return res.status( 400 ).json({
                msg: 'No tiene autorizacion'
            });
        }
                  
        const  validPassword = vBcryptjs.compareSync( password, vConsejero.password );
        if( !validPassword )
        { 

            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrectos'
                }
            );

        }
        

        // ----------- Generar el JWT
        //const vToken = await mGenerarJWT(vCoordinador.id)

        res.json({
            msg:'Inicio de sesion correcto',
            vConsejero,
            validUser:true
        });

        
    }catch (error) {
        return res.status(500).json({
            msg:'algo salio mal'
        });
    }       
    

        
}

const mLoginAdmin = async( req, res = response ) => {

    const {correo,password} = req.body
    
    try {
        
        console.log("---- login ---")
        console.log("---- admin ---")

        const vAdmin = await  vAdminModel.findOne({correo})
        console.log(vAdmin)
        
        if (!vAdmin) 
        {
            return res.status( 400 ).json({
                msg: 'Usuario / Contraseña incorrectos'
            }); 
        }
        
        
                  
        const  validPassword = vBcryptjs.compareSync( password, vAdmin.password );
        if( !validPassword )
        { 

            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrectos'
                }
            );

        }
        

        // ----------- Generar el JWT
        //const vToken = await mGenerarJWT(vCoordinador.id)

        res.json({
            msg:'Inicio de sesion correcto',
            vAdmin
        });

        
    }catch (error) {
        return res.status(500).json({
            msg:'algo salio mal'
        });
    }       
    

        
}

const mForgotPassword = async( req, res = response ) => {

    const {correo,...resto} = req.body

    const validCorreo = await vUsuarioModel.findOne({correo})
    console.log(validCorreo)

    if ( !validCorreo  ) 
    {
        return res.status(400).json({msg:'correo invalido'})
    }

    const password = vGenerator.generate({
        length: 10,
        numbers: true
    });

    const temp = password
   

    if ( password ) 
    {
        const vSalt = vBcryptjs.genSaltSync();
        resto.password = vBccrypyjs.hashSync(password,vSalt)
    }

    try {
       
        //const vAdmin = await vAdminModel.find({'correo':correo})
        //console.log('busqueda admin: ',vAdmin)
        
        const passwordT = password

        await vUsuarioModel.update({'_correo':correo},resto)

        res.status(200).json({
            msg:correo,
            passwordT
        })

        
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'ocurrio un error'})
    }
      
}

const mForgotPasswordAdmin = async( req, res = response ) => {

    const {correo,...resto} = req.body

    const validCorreo = await vAdminModel.findOne({correo})
    console.log(validCorreo)

    if ( !validCorreo  ) 
    {
        return res.status(400).json({msg:'correo invalido'})
    }

    const password = vGenerator.generate({
        length: 10,
        numbers: true
    });

    const temp = password
    console.log(temp)

    if ( password ) 
    {
        const vSalt = vBcryptjs.genSaltSync();
        resto.password = vBccrypyjs.hashSync(password,vSalt)
    }

    try {
       
        //const vAdmin = await vAdminModel.find({'correo':correo})
        //console.log('busqueda admin: ',vAdmin)
        
        const passwordT = password

        const vUpdatePasswordA = await vAdminModel.update({'_correo':correo},resto)

        console.log(vUpdatePasswordA)

        res.json({
            msg:correo,
            passwordT
        })

        
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'ocurrio un error'})
    }
      
}

const mForgotPasswordAux = async( req, res = response ) => {

    const {correo,...resto} = req.body

    const validCorreo = await vAuxiliarModel.findOne({correo})
    console.log(validCorreo)

    if ( !validCorreo  ) 
    {
        return res.status(400).json({msg:'correo invalido'})
    }

    const password = vGenerator.generate({
        length: 10,
        numbers: true
    });

    const temp = password
    console.log(temp)

    if ( password ) 
    {
        const vSalt = vBcryptjs.genSaltSync();
        resto.password = vBccrypyjs.hashSync(password,vSalt)
    }

    try {
       
        //const vAdmin = await vAdminModel.find({'correo':correo})
        //console.log('busqueda admin: ',vAdmin)
        
        const passwordT = password

        const vUpdatePasswordA = await vAuxiliarModel.updateOne({'_correo':correo},resto,{new:true})


        res.json({
            msg:correo,
            passwordT
        })

       
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'ocurrio un error'})
    }
      
}

const mForgotPasswordConsj = async( req, res = response ) => {

    const {correo,...resto} = req.body

    const validCorreo = await vConsejeroModel.findOne({correo})
    console.log(validCorreo)

    if ( !validCorreo  ) 
    {
        return res.status(400).json({msg:'correo invalido'})
    }

    const password = vGenerator.generate({
        length: 10,
        numbers: true
    });

    const temp = password
    console.log(temp)

    if ( password ) 
    {
        const vSalt = vBcryptjs.genSaltSync();
        resto.password = vBccrypyjs.hashSync(password,vSalt)
    }

    try {
       
        //const vAdmin = await vAdminModel.find({'correo':correo})
        //console.log('busqueda admin: ',vAdmin)
        
        const passwordT = password

        const vUpdatePasswordA = await vConsejeroModel.update({'_correo':correo},resto)

        console.log(vUpdatePasswordA)

        res.json({
            msg:correo,
            passwordT
        })

        
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'ocurrio un error'})
    }
      
}

const mRestGen = async( req, res = response ) => {

    const {correo,...resto} = req.body
    const password = vGenerator.generate({
        length: 10,
        numbers: true
    });

    const temp = password
    console.log(temp)

    if ( password ) 
    {
        const vSalt = vBcryptjs.genSaltSync();
        resto.password = vBccrypyjs.hashSync(password,vSalt)
    }

    try {
       
        //const vAdmin = await vAdminModel.find({'correo':correo})
        //console.log('busqueda admin: ',vAdmin)
        
        const passwordT = password

        const validandoExistencia = await vAdminModel.find({'_correo':correo})

        console.log(validandoExistencia)

        
        if (vAdmin) 
        {
            console.log('entro admin')
            const passwordT = password
            const vUpdatePasswordA = await vAdminModel.findOneAndUpdate({'_correo':correo},resto,{new:true})
            console.log(vUpdatePasswordA)
            return res.json({
                msg:vUpdatePasswordA.correo,
                passwordT
            })
        }else 
        {
            const vAuxiliar = await vAuxiliarModel.find({'correo':correo})
            console.log('AUXILIAR: ',resto)
            if (vAuxiliar.length >= 1) 
            {
                const passwordT = password
                const vUpdatePasswordA = await vAuxiliarModel.findOneAndUpdate({'_correo':correo},resto,{new:true})
                return res.json({
                    msg:vUpdatePasswordA.correo,
                    passwordT
                })
            }else
            {
                const vConsejero = await vConsejeroModel.find({'correo':correo})
                console.log('CONSEJERO: ',resto)
                if (vConsejero.length >= 1) 
                {
                        const passwordT = password
                        const vUpdatePasswordA = await vConsejeroModel.findOneAndUpdate({'_correo':correo},resto,{new:true})
        
                        return res.json({
                            msg:vUpdatePasswordA.correo,
                            passwordT
                        })
                }else
                {
                    const vUsuario = await vUsuarioModel.find({'correo':correo})
                    console.log('MODERADOR: ',resto)
                    if (!vUsuario.length >= 1) 
                    {
                            const passwordT = password
                            const vUpdatePasswordA = await vUsuarioModel.findOneAndUpdate({'_correo':correo},resto,{new:true})
            
                            return res.json({
                                msg:vUpdatePasswordA.correo,
                                passwordT
                            })
                    }else {
                        return res.status(400).json({msg:'no coincide ningun usuario'})
                    }
                }
            }
        }
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({msg:'ocurrio un error'})
    }
      
}

const mLoginGen = async(req, res = response) => {
    const {correo,password} = req.body

    try {
        
        const vUsuario = await  vUsuarioModel.findOne({correo})

        
        if (!vUsuario) 
        {
            return res.status( 400 ).json({
                msg: 'Usuario / Contraseña incorrectos'
            }); 
        }     
          
        const  validPassword = vBcryptjs.compareSync( password, vUsuario.password );
        if( !validPassword )
        { 

            return res.status(400).json(
                {
                    msg: 'Usuario / Password incorrectos'
                }
            );

        }
        console.log("---- login ---")
        console.log("---- Moderador ---")
        // ----------- Generar el JWT
        //const vToken = await mGenerarJWT(vUsuario.id)
        res.status(200).json({msg:'Inicio de sesion correcto',vUsuario,validUser:true})
        

                 
       
        
    } catch (error) {
        return res.status(500).json({
            msg:'algo salio mal' 
        });
    }
}


module.exports = {
    mLogin,
    mLoginAuxiliar,
    mLoginConsejero,
    mLoginAdmin,
    mForgotPassword,
    mForgotPasswordAdmin,
    mForgotPasswordAux,
    mForgotPasswordConsj,
    mRestGen
    

}