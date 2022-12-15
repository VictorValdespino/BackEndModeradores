/*
SmartSoft
Componente:mValidarJWT
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se valida que el JWT   sea valido 

Numero de metodos: 1
Componentes relacionados: usuario.model vUsuario
*/

const { response, request } = require("express");

const vJwt = require('jsonwebtoken');

const vUsuario = require('../models/usuario.model');


const mValidarJWT  = async( req =request , res = response, next  ) => {

    const token = req.header('x-token');
    // verificar si existe token
    if(!token)
    {
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try {
        
       const{uid} = vJwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer usuario por uid correspondiente
       const usuario  = await vUsuario.findById( uid );

       

        //si usuariop no existe
        if( !usuario)
        {

            return res.status(401).json({msg:`Usuario ${usuario.nombre} no existente`})

        }
        

       //verifcar si uid estado true
        if(!usuario.estado)
        {

            return res.status(401).json({msg:`${usuario.estado} Token no valido`})


        }

        req.usuario = usuario;

        
        next();
    } catch (error) {

        console.log(error);

        res.status(401).json({
            msg:'Token no valido'
        })
    } 


}

module.exports ={mValidarJWT}