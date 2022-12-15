/*
SmartSoft
Componente:mValidarCampos
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se valida que ningun campo venga vacio

Numero de metodos: 1
Componentes relacionados: 
*/

const { validationResult } = require("express-validator");

const mValidarCampos = (req,res, next) => {

    const vErrors = validationResult(req)
    if ( !vErrors.isEmpty() )
    {
        return res.status(400).json(vErrors);
    }
    
    next()
}


module.exports = {
    mValidarCampos
}