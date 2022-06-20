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
exports.deleteFallecido = exports.putFallecido = exports.postFallecidos = exports.getFallecido = exports.getFallecidos = exports.getFallecidosCriba = exports.obtenerRelacionado = void 0;
const sequelize_1 = require("sequelize");
const fallecido_1 = __importDefault(require("../models/fallecido"));
/* export const obtenerFallecidosSepultura = async (req:Request, res:Response) => {
    const {id} = req.params;

    const fallecidossepultura = await Fallecido.findAll(
        {
            where: {sepultId:id}
        }
    )
    res.json(fallecidossepultura)
} */
const obtenerRelacionado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sepult } = req.params;
    console.log(sepult);
    const muerto = yield fallecido_1.default.findAll({ where: { sepult: sepult } });
    try {
        if (!sepult) {
            res.json(muerto);
        }
        return res.json(muerto);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.obtenerRelacionado = obtenerRelacionado;
const getFallecidosCriba = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tipo = req.params.tipo;
    const busqueda = req.params.termino;
    switch (tipo) {
        case 'apellido':
            const fallecidos = yield fallecido_1.default.findAll({ limit: 10,
                where: { apellidos: {
                        [sequelize_1.Op.like]: '%' + busqueda + '%'
                    }
                } });
            res.json(fallecidos);
            break;
        case 'sepultura':
            const fallecidosSep = yield fallecido_1.default.findAll({ limit: 10,
                where: { sepult: {
                        [sequelize_1.Op.like]: '%' + busqueda + '%'
                    }
                } });
            res.json(fallecidosSep);
            break;
        default:
            res.status(400).json({
                msg: `Hable con el Administrador`
            });
    }
});
exports.getFallecidosCriba = getFallecidosCriba;
const getFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fallecidos = yield fallecido_1.default.findAll();
    res.json(fallecidos);
});
exports.getFallecidos = getFallecidos;
const getFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const fallecidos = yield fallecido_1.default.findByPk(id);
    res.json(fallecidos);
});
exports.getFallecido = getFallecido;
const postFallecidos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    console.log(body);
    try {
        const fallecidos = fallecido_1.default.build(body);
        yield fallecidos.save();
        console.log('Fallecido creado en base de datos');
        res.json(fallecidos);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.postFallecidos = postFallecidos;
const putFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun fallecido con el id ' + id
            });
        }
        yield fallecido.update(body);
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.putFallecido = putFallecido;
const deleteFallecido = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const fallecido = yield fallecido_1.default.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            });
        }
        yield fallecido.destroy();
        res.json(fallecido);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
});
exports.deleteFallecido = deleteFallecido;
//# sourceMappingURL=fallecidos.js.map