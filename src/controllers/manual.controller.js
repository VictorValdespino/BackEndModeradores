/*
SmartSoft
Componente: mRegistrarUrlManualPost, mObtenerUrlManualGet, mActualizarUrlManualPut,

Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se desarrollan los diferentes controladores para almacenar la url del del manual

Numero de metodos: vManualModel manual.model
Componentes relacionados: 
*/

const vManualModel = require("../models/manual.model");
const { response } = require("express");

const mRegistrarUrlManualPost = async (req, res = response) => {
  const { id } = req.params;
  const { url } = req.body;

  //636035797695c1a38c7e1833

  const vManual = new vManualModel({
    url,
  })

  try 
  {
    console.log(vManual)
    await vManual.save()
    res.status(201).json({
      msg: "ok",
      url: vManual.url,
    })
  } catch (error) 
  {
    console.log(error);
    return res.status(400).json({
      msg: "error",
    })
  }
};

const mObtenerUrlManualGet = async (req, res = response) => {
  try {
    const vManual = await vManualModel.find();
    let vTemp = null;

    if (!vManual) 
    {
      return res.status(400).json({
        msg: "No se a encontrado nada",
        valor: false,
      });
    }

    for (const iterator of vManual) 
    {
      vTemp = iterator.url;
      console.log(vTemp);
    }

    res.status(200).json({
      msg: "ok",
      url: vTemp,
    });
  } catch (error) 
  {
    console.log(error);
    return res.status(400).json({
      msg: "error",
    });
  }
};

const mActualizarUrlManualPut = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;
  
  if (!resto.url) 
  {
    return res.status(400).json({
      msg: "Error al mandar url",
      valor: false,
    });
  }

  try {
    const vManual = await vManualModel.updateOne({id},resto)
    
    const vFind = await vManualModel.find({id})

    for (const iterator of vFind) 
    {
      vTemp = iterator.url;
      
    }

    res.status(200).json(vTemp);
  } catch (error) 
  {
    console.log(error);
    return res.status(400).json({
      msg: "error",
    });
  }
};

module.exports = {
  mRegistrarUrlManualPost,
  mObtenerUrlManualGet,
  mActualizarUrlManualPut,
};
