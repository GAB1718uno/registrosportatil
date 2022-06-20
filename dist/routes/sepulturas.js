"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const sepulturas_1 = require("../controllers/sepulturas");
const router = (0, express_1.Router)();
router.get('/', sepulturas_1.obtenerSepulturas); //[ validarJwt ],
router.get('/:id/fallecidos', sepulturas_1.obtenerFallecidosSepultura);
router.post('/', sepulturas_1.crearSepultura); //[ validarJwt ],
router.put('/:id', sepulturas_1.crearSepultura); //[ validarJwt ],
router.delete('/:id', sepulturas_1.deleteSepultura); //[ validarJwt ],
router.get('/:id', sepulturas_1.obtenerSepultura); //[ validarJwt ],
exports.default = router;
//# sourceMappingURL=sepulturas.js.map