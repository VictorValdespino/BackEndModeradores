
const { mUploadFile } = require('../helpers/upload-archivo.helper')
const vUsuarios = require('../models/usuario.model')
const vCoordinadorModel = require('../models/auxiliar.model')
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL);

const mImgUploadPut = async(req,res) => {

    try 
    {

        const nombre = await mUploadFile(req.files, undefined,'imgs');
        res.json({nombre}) 

    } catch (msg) 
    {

        res.status(400).json(msg);
        
    }
}

const mUpdateImageCoordinador = async( req, res = response ) => {

    const { id } = req.params;


    const modelo = await vCoordinadorModel.findById(id);

    if ( !modelo ) 
    {

        return res.status(400).json({

            msg: ` No existe un usuario con ese ${id}`

        })
        
    }

    // Limpiar imagenes previas
    if (modelo.img) {
      //hay que borrar img del servidor
      //path de la imgen
      const pathImagen = path.join(__dirname, '../uploads', modelo.img);
      //si existe
      if ( fs.existsSync( pathImagen ) ) 
      {
        fs.unlinkSync(pathImagen);
      }

    }

    const nombre = await mUploadFile(req.files, undefined,'coordinador'); 

    modelo.img = nombre;

    await modelo.save();

    res.json({modelo})
}


const mImgUpdateCloudinaryPut = async( req, res = response ) => {
    
    const { id } = req.params
    // Limpiar imagenes previas

    const modelo = await vCoordinadorModel.findById(id);

    if ( !modelo ) 
    {   
        return res.status(400).json({   
            msg: ` No existe un usuario con ese ${id}`  
        })

    }

    if (modelo.imagen) 
    {
    
      const nombreArr = modelo.imagen.split('/');
      const nombre = nombreArr[ nombreArr.length - 1 ];
      const [public_id] = nombre.split('.');
      cloudinary.uploader.destroy(public_id); 

    }

    //guardar imagenes en la nube con cloudinary    
    const { tempFilePath } = req.files.archivo;
    const { secure_url }= await cloudinary.uploader.upload( tempFilePath  );    
    modelo.imagen = secure_url;

    console.log("mCloud -> ",modelo)

    await modelo.save();
    res.json(modelo)



}

const mImgShowGet = async(req,res=response) => {

    const {id} = req.params

    try 
    {
        const modelo = await vCoordinadorModel.findById(id)


        // Limpiar imagenes previas
        if (modelo.imagen) 
        {
            //hay que borrar img del servidor
            //path de la imgen
            const pathImagen = modelo.imagen
            console.log("path img -> ",pathImagen);
            //si existe
            return res.json( pathImagen );
        }

    } catch (error) {

        console.log(error)
        const pathImagenERR = path.join(__dirname, '../assets/no-image.jpg');

        res.sendFile(pathImagenERR)

    }
    



}

module.exports = {
    mImgUploadPut,
    mUpdateImageCoordinador,
    mImgUpdateCloudinaryPut,
    mImgShowGet  
}