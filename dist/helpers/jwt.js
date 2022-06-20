"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generarJwt = (uid, usuario, email) => {
    const payload = {
        uid,
        usuario
    };
    return new Promise((resolve, reject) => {
        jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '24h'
        }, (err, token) => {
            // TODO MAL
            if (err) {
                reject(err);
            }
            else
                //TODO BIEN
                resolve(token);
        });
    });
};
exports.default = generarJwt;
//# sourceMappingURL=jwt.js.map