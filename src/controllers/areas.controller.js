/*
SmartSoft
Componente: mAreaGet 
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
mAreaGet obtiene las areas de interes

Numero de metodos: 1
Componentes relacionados: area.model vAreasDeInteres
*/

const { response } = require("express");
const vAreaInteresModel = require('../models/areas.model')

const mAreaGet = async(req, res = response) => {
    
    try 
    {
        const vAreaInteres = await vAreaInteresModel.find()
        console.log("si entro")
        res.status(201).json(vAreaInteres)

    } catch ( error ) 
    {
        console.log(error);
    }
}

module.exports = {
    mAreaGet
}