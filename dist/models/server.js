"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const usuarios_1 = __importDefault(require("../routes/usuarios"));
const fallecidos_1 = __importDefault(require("../routes/fallecidos"));
const uploads_1 = __importDefault(require("../routes/uploads"));
const sepulturas_1 = __importDefault(require("../routes/sepulturas"));
const connection_1 = __importDefault(require("../db/connection"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
class Server {
    constructor() {
        this.usersPaths = {
            usuarios: '/api/usuarios'
        };
        this.pathsFallecidos = {
            muertos: '/api/muertos'
        };
        this.pathSepulturas = {
            sepulturas: '/api/sepulturas'
        };
        this.pathUploads = {
            uploads: '/api/uploads'
        };
        this.app = (0, express_1.default)();
        this.secret = process.env.SECRET_JWT_SEED || '';
        this.port = process.env.PORT || '3000';
        this.dbConnection();
        //Llamando middlewares
        this.middlewares();
        //Definiendo rutas
        this.routes();
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.sync({ alter: true });
                //await db.authenticate();
                console.log(' Base de datos ONLINE ');
            }
            catch (error) {
                throw new Error("error");
                console.log(error);
            }
        });
    }
    routes() {
        this.app.use(this.usersPaths.usuarios, usuarios_1.default);
        this.app.use(this.pathsFallecidos.muertos, fallecidos_1.default);
        this.app.use(this.pathUploads.uploads, uploads_1.default);
        this.app.use(this.pathSepulturas.sepulturas, sepulturas_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Base de Datos CONECTADA, UJÚ, en el puerto', +this.port);
        });
    }
    middlewares() {
        //Cors
        this.app.use((0, cors_1.default)());
        //Lectura del body
        this.app.use(express_1.default.json());
        //Carga de uploads de archivos
        this.app.use((0, express_fileupload_1.default)());
        //Carpeta publica
        this.app.use(express_1.default.static('public'));
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map