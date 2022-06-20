"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const usuarios_1 = require("../controllers/usuarios");
const validarCampos_1 = require("../middlewares/validarCampos");
const validarEmail_1 = require("../middlewares/validarEmail");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/renuevo', [validarJWT_1.validarJwt], usuarios_1.revalidarToken);
router.get('/', usuarios_1.obtenerUsuarios);
router.post('/nuevo', [
    (0, express_validator_1.check)('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos_1.validarCampos,
    validarEmail_1.validarEmail,
], usuarios_1.crearUsuario);
router.get('/:id', usuarios_1.obtenerUsuario);
router.put('/:id', [
    (0, express_validator_1.check)('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    (0, express_validator_1.check)('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos_1.validarCampos,
    validarEmail_1.validarEmail
], usuarios_1.actualizarUsuario);
router.post('/', [validarJWT_1.validarJwt], usuarios_1.comprobarLogin);
router.delete('/:id', usuarios_1.deleteUsuario);
exports.default = router;
//# sourceMappingURL=usuarios.js.map