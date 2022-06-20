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
exports.mostrarFile = exports.mostrarDatosFile = exports.borramosDatosFile = exports.actualizarFile = exports.crearFile = void 0;
const uuid_1 = require("uuid");
const actualizar_imagen_1 = __importDefault(require("../helpers/actualizar-imagen"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const uploads_1 = __importDefault(require("../models/uploads"));
const crearFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const tipo = req.params.tipo.toLowerCase();
    const id = req.params.id;
    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];
    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        });
    }
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    //Procesar archivo
    const file = req.files.file;
    console.log(file);
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            id,
            nombreArchivo
        });
    });
    body.tipo = tipo;
    body.avatar = nombreArchivo;
    switch (tipo) {
        case 'usuarios':
            const usuario = uploads_1.default.build(body);
            yield usuario.save();
            console.log(usuario);
            break;
        case 'fallecidos':
            const fallecido = uploads_1.default.build(body);
            yield fallecido.save();
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body
            });
            return true;
            break;
        case 'sepulturas':
            const sepultura = uploads_1.default.build(body);
            yield sepultura.save();
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body
            });
            console.log(sepultura);
            break;
        default:
            break;
    }
});
exports.crearFile = crearFile;
const actualizarFile = (req, res) => {
    const tipo = req.params.tipo;
    const id = req.params.id;
    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];
    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        });
    }
    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }
    // Procesar la carga de la imagen
    const file = req.files.imagen;
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1];
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif'];
    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }
    //Generar nombre del archivo
    const nombreArchivo = `${(0, uuid_1.v4)()}.${extensionArchivo}`;
    console.log(file);
    console.log(nombreArchivo);
    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;
    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.status(200).json({
            ok: true,
            id,
            nombreArchivo
        });
    });
    (0, actualizar_imagen_1.default)(id, tipo, nombreArchivo);
};
exports.actualizarFile = actualizarFile;
const borramosDatosFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const tipo = req.params.tipo;
    const fallecidoFiles = yield uploads_1.default.findByPk(id);
    if (!fallecidoFiles) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe usuario con el ID: ' + id
        });
    }
    yield fallecidoFiles.destroy();
    res.json(fallecidoFiles);
});
exports.borramosDatosFile = borramosDatosFile;
const mostrarDatosFile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidosUploads = yield uploads_1.default.findAll();
    res.json(fallecidosUploads);
});
exports.mostrarDatosFile = mostrarDatosFile;
const mostrarFile = (req, res) => {
    const archivo = req.params.archivo;
    const tipo = req.params.tipo.toLowerCase();
    const pathFile = path_1.default.join(__dirname, `../uploads/${tipo}/${archivo}`);
    const pathFileCortado = pathFile.replace('dist', '');
    if (fs_1.default.existsSync(pathFileCortado)) {
        res.sendFile(pathFileCortado);
    }
    else {
        const pathFile = path_1.default.join(__dirname, `../uploads/no-image.png`);
        const pathFileCortado = pathFile.replace('dist', '');
        res.sendFile(pathFileCortado);
    }
};
exports.mostrarFile = mostrarFile;
//# sourceMappingURL=uploads.js.map