"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const validarCampos_1 = require("../middlewares/validarCampos");
const fallecidos_1 = require("../controllers/fallecidos");
const router = (0, express_1.Router)();
router.get('/', fallecidos_1.getFallecidos);
router.get('/busqueda/:tipo/:termino', fallecidos_1.getFallecidosCriba);
router.get('/:id', fallecidos_1.getFallecido);
router.get('/:id/:sepult', fallecidos_1.obtenerRelacionado);
router.put('/:id', [
    (0, express_validator_1.check)('name', 'El nombre del fallecido es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos_1.validarCampos,
], fallecidos_1.putFallecido);
router.post('/', [
    (0, express_validator_1.check)('name', 'El nombre es obligatorio').not().isEmpty(),
    (0, express_validator_1.check)('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos_1.validarCampos
], fallecidos_1.postFallecidos);
router.delete('/:id', fallecidos_1.deleteFallecido);
exports.default = router;
//# sourceMappingURL=fallecidos.js.map