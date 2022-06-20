"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteUsuario = exports.actualizarUsuario = exports.crearUsuario = exports.obtenerUsuario = exports.obtenerUsuarios = exports.revalidarToken = exports.comprobarLogin = void 0;
const usuario_1 = __importDefault(require("../models/usuario"));
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = __importDefault(require("../helpers/jwt"));
const comprobarLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(email, password);
    const usuario = yield usuario_1.default.findOne({ where: { email: email } });
    //console.log(usuario.email)
    try {
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }
        const validPassword = yield bcrypt.compare(password, usuario.password);
        /* console.log(password)
        console.log(usuario.password)
        console.log(validPassword) */
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password no encontrado'
            });
        }
        //Generando Token/* 
        const token = yield (0, jwt_1.default)(usuario.id, usuario.usuario, usuario.email);
        return res.status(201).json({
            ok: true,
            msg: "Logueado con éxito",
            uid: usuario.id,
            name: usuario.usuario,
            email: email,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.comprobarLogin = comprobarLogin;
const revalidarToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid } = req;
    //leer de la base de datos
    const bdUser = yield usuario_1.default.findByPk(uid);
    const user = bdUser === null || bdUser === void 0 ? void 0 : bdUser.usuario;
    const ema = bdUser === null || bdUser === void 0 ? void 0 : bdUser.email;
    //Generando Token/* 
    const token = yield (0, jwt_1.default)(uid, user, ema);
    res.status(201).json({
        ok: true,
        msg: 'Token renovado',
        uid: uid,
        name: user,
        email: ema,
        token
    });
});
exports.revalidarToken = revalidarToken;
const obtenerUsuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usuarios = yield usuario_1.default.findAll();
    res.json(usuarios);
});
exports.obtenerUsuarios = obtenerUsuarios;
const obtenerUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const usuario = yield usuario_1.default.findByPk(id);
    if (usuario) {
        res.json(usuario);
    }
    else {
        res.status(404).json({
            msg: `No existe un usuario con este ID`
        });
    }
});
exports.obtenerUsuario = obtenerUsuario;
const crearUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        const salt = bcrypt.genSaltSync(10);
        req.body.password = bcrypt.hashSync(req.body.password, salt);
        const usuario = yield usuario_1.default.create(body);
        /* const usuario = Usuario.build( req.body )
        
        await usuario.save(); */
        console.log(usuario.id);
        //Generando Token/* 
        const token = yield (0, jwt_1.default)(usuario.id, usuario.usuario, usuario.email);
        res.status(201).json({
            ok: true,
            msg: "Usuario creado con éxito",
            uid: usuario.id,
            email: usuario.email,
            token
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`,
            error
        });
    }
});
exports.crearUsuario = crearUsuario;
const actualizarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID'
            });
        }
        yield usuario.update(body);
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.actualizarUsuario = actualizarUsuario;
const deleteUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const usuario = yield usuario_1.default.findByPk(id);
        if (!usuario) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            });
        }
        /* await usuario.update( { estado: false }) */
        yield usuario.destroy();
        res.json(usuario);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.deleteUsuario = deleteUsuario;
//# sourceMappingURL=usuarios.js.map