import cors from 'cors';
import express, { Application} from 'express';
import userRoutes from '../routes/usuarios';
import fallecidosRoutes from "../routes/fallecidos";
import uploadsRoutes from "../routes/uploads";
import sepulturaRoutes from "../routes/sepulturas"
import db from '../db/connection';
import fileUpload from 'express-fileupload';
import Fallecido  from "../models/fallecido";
import Sepultura  from "../models/sepultura";


class Server {

    private app: Application;
    private port: string;
    private secret: string;
    private usersPaths = {
        usuarios: '/api/usuarios'
    }

    private pathsFallecidos = {
        muertos: '/api/muertos'
    }

    private pathSepulturas = {
        sepulturas: '/api/sepulturas'
    }

    private pathUploads ={
        uploads: '/api/uploads'
    }


    constructor(){
        this.app = express();
        this.secret = process.env.SECRET_JWT_SEED || '';
        this.port = process.env.PORT || '3000'

        this.dbConnection();
        
        //Llamando middlewares
        this.middlewares();

        //Definiendo rutas
        this.routes();

       

    }

    async dbConnection(){
    try {
        
       await db.sync({alter: true})
        //await db.authenticate();
        console.log(' Base de datos ONLINE ')

    } catch (error) {

        throw new Error("error");
        console.log (error);
        
        
    }
    }

    routes () {
        this.app.use( this.usersPaths.usuarios, userRoutes)
        this.app.use(this.pathsFallecidos.muertos, fallecidosRoutes)
        this.app.use(this.pathUploads.uploads, uploadsRoutes)
        this.app.use(this.pathSepulturas.sepulturas, sepulturaRoutes)
        }

    
    
    listen(){
        this.app.listen(this.port, () => {
            console.log('Base de Datos CONECTADA, UJÚ, en el puerto', + this.port)
        })
    }


    middlewares():void{

        //Cors
        this.app.use( cors() );
    
        //Lectura del body
        this.app.use( express.json() );

        //Carga de uploads de archivos
        this.app.use(fileUpload());

    
        //Carpeta publica
        this.app.use( express.static('public'));
    }
}

export default Server;