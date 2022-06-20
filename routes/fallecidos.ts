import { Router } from "express";
import { check } from "express-validator";
import { validarCampos } from '../middlewares/validarCampos';
import { deleteFallecido, getFallecido, getFallecidos, postFallecidos, putFallecido, obtenerRelacionado, getFallecidosCriba } from '../controllers/fallecidos';

const router = Router();


router.get('/', getFallecidos);
router.get('/busqueda/:tipo/:termino', getFallecidosCriba);
router.get('/:id', getFallecido);
router.get('/:id/:sepult', obtenerRelacionado);
router.put('/:id',
[
    check('name', 'El nombre del fallecido es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos,
] , putFallecido);
 router.post('/',
[
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('apellidos', 'El apellido es obligatorio').not().isEmpty(),
    validarCampos
] , postFallecidos);
router.delete('/:id', deleteFallecido);






export default router;