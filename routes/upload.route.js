
const { Router } = require('express'); 
const { check } = require('express-validator');
const { mUpdateImageCoordinador,
        mImgUpdateCloudinaryPut,
        mImgShowGet } = require('../src/controllers/upload.controller')
const {validarArchivoSubir} = require('../src/middleware/valid-file.middleware')
const { mValidarCampos } = require('../src/middleware/validar-campos.middleware');
const vRouter = Router()

vRouter.get('/coordinador-show-img/:id',[
    check('id','el id debe ser de mongo').isMongoId(),
    mValidarCampos
], mImgShowGet)

vRouter.put('/coordinador-cloud/:id',[
    validarArchivoSubir,
    check('id','el id debe ser de mongo').isMongoId(),
    mValidarCampos
],mImgUpdateCloudinaryPut )

vRouter.put('/coordinador/:id',[
    validarArchivoSubir,
    check('id','el id debe ser de mongo').isMongoId(),
    mValidarCampos
],mUpdateImageCoordinador )



module.exports = vRouter