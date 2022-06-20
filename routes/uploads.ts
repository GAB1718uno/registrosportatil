import { Router } from 'express';
import { actualizarFile, borramosDatosFile, crearFile, mostrarDatosFile, mostrarFile } from '../controllers/uploads';
import { validarJwt } from '../middlewares/validarJWT';

const router = Router();
router.get('/:tipo/:archivo', mostrarFile ) //[ validarJwt ],

router.put('/:tipo/:id', [ validarJwt ], actualizarFile )

router.delete('/:tipo/:id', [ validarJwt ], borramosDatosFile )

router.get('/:tipo/', mostrarDatosFile ) //[ validarJwt ],


router.post('/:tipo/', crearFile ) //[ validarJwt ],


export default router;