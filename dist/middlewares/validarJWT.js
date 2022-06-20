"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validarJwt = (req, res, next) => {
    const token = req.header('x-token');
    console.log(token);
    try {
        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no encontrado'
            });
        }
        const { uid, usuario, email } = jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT_SEED);
        req.uid = uid;
        req.usuario = usuario;
        req.email = email;
        /* console.log(uid,usuario)
        res.json({
            ok:true,
            msg:'Correcto',
            uid,
            usuario
        }) */
    }
    catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }
    //If Todo sale bien
    next();
};
exports.validarJwt = validarJwt;
//# sourceMappingURL=validarJWT.js.map