"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploads_1 = require("../controllers/uploads");
const validarJWT_1 = require("../middlewares/validarJWT");
const router = (0, express_1.Router)();
router.get('/:tipo/:archivo', uploads_1.mostrarFile); //[ validarJwt ],
router.put('/:tipo/:id', [validarJWT_1.validarJwt], uploads_1.actualizarFile);
router.delete('/:tipo/:id', [validarJWT_1.validarJwt], uploads_1.borramosDatosFile);
router.get('/:tipo/', uploads_1.mostrarDatosFile); //[ validarJwt ],
router.post('/:tipo/', uploads_1.crearFile); //[ validarJwt ],
exports.default = router;
//# sourceMappingURL=uploads.js.map