/*
SmartSoft
Componente:mGenerarJWT
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
genera un JWT

Numero de metodos: 1
Componentes relacionados: usuario.model vUsuario
*/

const { JsonWebTokenError } = require('jsonwebtoken');
const jwt = require('jsonwebtoken');

const mGenerarJWT = (uid = '') => {

    return new Promise( ( resolve, reject) => {

        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h'
        }, (err,token) => {

            if ( err ){
                console.log(err);
                reject(' no se pudo generar el token ');
            }else{
                resolve( token );
            }

        } )

    } )

}

module.exports = {

    mGenerarJWT

}