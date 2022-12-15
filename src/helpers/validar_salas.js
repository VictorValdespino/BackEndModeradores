const { validationResult } = require("express-validator");

const mValidarCamposSalas = (req,res, next) => {

    const vErrors = validationResult(req)
    if ( !vErrors.isEmpty() )
    {
        return res.status(400).json(vErrors);
    }
    
    next()
}


module.exports = {
    mValidarCamposSalas
}