/*
SmartSoft
Componente: Server
Fecha de creacion: 01/10/2022, Autorizó: Victor Manuel Valdespino Jaramillo, Revisó: 

Modificaciones:
    Fecha               Folio

Descripcion:
se crea el modelo del servidor por donde se correran las apis, creando sus respectivas propiedades para correr el servior
podemos encontrar 4 metodos que son, conectarDB, middleware, routes y listen
tres de estos metodos se inicion en el contructor(conectarDB,middleware,rouetes)

Numero de metodos: 4
Componentes relacionados: config.database
*/

const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.database");
const fileUpload = require("express-fileupload");

class Server{

    constructor(){
        this.app = express()
        this.port = process.env.PORT
        
        this.paths= {
            authPath : '/api/auth',
            areaPath: '/api/area',
            auxiliaresPath: '/api/auxiliares',
            consejeroPath:'/api/consejero',
            usuariosPath : '/api/usuarios',  
            universidadesPath : '/api/universidades',
            uploadPath:'/api/uploads',
            salasPath : '/api/salas',
            alumnosPath : '/api/alumnos',
            manualPath: '/api/manual',
            whatsPath: '/api/whats',
            adminPath: '/api/admin'
        }

    //conectar a base de datos
    this.conectarDB();

    //middleware, funciones que van a añadir otra funcion a nuestro webserverr

    this.middleware();

    //rutas
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middleware() {
    this.app.use(cors());
    //parseo y lectura de body

    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));

    //carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );

    //error 404
    /*this.app.use((req, res, next) => {
      const error = new Error("Not Found");
      error.status = 404;
      next(error);
    });

    //error 500
    this.app.use((error, req, res, next) => {
      res.status(error.status || 500);
      res.json({
        error: {
          message: error.message,
        },
      });
    });*/
  }

    routes() {
        this.app.use(this.paths.authPath,require('../../routes/auth.route'))
        this.app.use(this.paths.areaPath,require('../../routes/area.route'))
        this.app.use(this.paths.auxiliaresPath,require('../../routes/auxiliares.route'))
        this.app.use(this.paths.consejeroPath,require('../../routes/consejero.route'))
        this.app.use(this.paths.usuariosPath,require('../../routes/usuarios.route'))
        this.app.use(this.paths.universidadesPath, require('../../routes/universidades.route'))
        this.app.use(this.paths.uploadPath, require('../../routes/upload.route'))
        this.app.use(this.paths.salasPath, require('../../routes/salas.route'))
        this.app.use(this.paths.salasPath, require('../../routes/alumnos.route'))
        this.app.use(this.paths.manualPath, require('../../routes/manual.route'))
        this.app.use(this.paths.whatsPath, require('../../routes/whatsapp.route'))
        this.app.use(this.paths.adminPath, require('../../routes/administrador.route'))
    }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;
