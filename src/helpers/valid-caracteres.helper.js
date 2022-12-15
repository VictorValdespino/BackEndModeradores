/*
SmartSoft
Componente: mValidCaracteres, mValidCaracteresMas3
Fecha de creacion: 20/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
validar caracteres, para filtrar simbolos o cosas que el campo no requiera

Numero de metodos: 2
Componentes relacionados:
*/

const mValidCaracteres = (data = '') => {

    const vExpRegSoloLetras="^[A-ZÑa-zñáéíóúÁÉÍÓÚ'° ]+$"
    console.log(data)
    if ( data.match(vExpRegSoloLetras) == null  ) 
    {
        throw new Error(`se estan ingresando datos no permitidos` )
    }
    else
    {
        return true
    }
}

const mValidCaracteresMas3 = (data = '') => {
    /*
    var str = 'mmlo'
    var cont = 0
    var temp = null
    for (const iterator of str) {
      temp = iterator
      console.log(temp)
      if (!iterator.localeCompare(temp)) {
        cont +=  1
        console.log(cont)
        if ( cont >= 3 ) {
          return res.status(400).json({msg:'no se puedecolocar mas de tres carcateres seguidos'})
        }
      }else{
        cont = 0
      }
      
    }*/
}

module.exports = {
    mValidCaracteres,
    mValidCaracteresMas3
}