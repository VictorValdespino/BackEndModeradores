/*
SmartSoft
Componente: app
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
instancia del servidor para express y uso de las variables de entorno 

Numero de metodos: 1
Componentes relacionados: server.model
*/

require('dotenv').config();

const Server = require('./src/models/server.model')

const server = new Server()

server.listen();