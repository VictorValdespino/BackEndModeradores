/*
SmartSoft
Componente: mRegistrarWhatsPost, mObtnerWhatsPost, mActualizarWhatsPut,
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
Se desarrollan los diferentes controladores para obtener la URL del grupo de whatsapp

Numero de metodos: 2
Componentes relacionados: usuario.model vUsuario, coordinador.model vCoordinadorModel
*/

const vWhatsModel = require("../models/whats.model");
const { response } = require("express");

const mRegistrarWhatsPost = async (req, res = response) => {
  
  const { url } = req.body;

  //636035797695c1a38c7e1833

  const vWhats = new vWhatsModel({
    url,
  });

  try 
  {
    
    await vWhats.save();
    res.status(201).json({
      msg: "ok",
      url: vWhats.url,
    });
  } catch (error) 
  {
    console.log(error);
    return res.status(400).json({
      msg: "error",
    });
  }
};

const mObtnerWhatsPost = async (req, res = response) => {
  try 
  {
    const vWhats = await vWhatsModel.find();
    let vTemp = null;

    if (!vWhats) 
    {
      return res.status(400).json({
        msg: "No se a encontrado nada",
        valor: false,
      });
    }

    for (const iterator of vWhats) 
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

const mActualizarWhatsPut = async (req, res = response) => {
  const { id } = req.params;
  const { ...resto } = req.body;
  
  if (!resto.url) 
  {
    return res.status(400).json({
      msg: "Error al mandar url",
      valor: false,
    });
  }

  try 
  {
    const vWhats = await vWhatsModel.updateOne({id},resto)
    
    const vFind = await vWhatsModel.find({id})

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
    mRegistrarWhatsPost,
    mObtnerWhatsPost,
    mActualizarWhatsPut,
};
