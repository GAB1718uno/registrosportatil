import { Router } from 'express';
import { crearSepultura, deleteSepultura, obtenerFallecidosSepultura, obtenerSepultura, obtenerSepulturas } from '../controllers/sepulturas';
import { actualizarFile, borramosDatosFile, crearFile, mostrarDatosFile, mostrarFile } from '../controllers/uploads';
import { validarJwt } from '../middlewares/validarJWT';

const router = Router();

router.get('/', obtenerSepulturas ) //[ validarJwt ],

router.get('/:id/fallecidos', obtenerFallecidosSepultura)
router.post('/', crearSepultura ) //[ validarJwt ],
router.put('/:id', crearSepultura ) //[ validarJwt ],
router.delete('/:id', deleteSepultura ) //[ validarJwt ],
router.get('/:id', obtenerSepultura ) //[ validarJwt ],


export default router;