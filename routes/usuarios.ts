import { Router } from "express";
import { check } from "express-validator";
import { deleteUsuario, comprobarLogin, revalidarToken, crearUsuario, obtenerUsuarios, obtenerUsuario, actualizarUsuario } from '../controllers/usuarios';
import { validarCampos } from '../middlewares/validarCampos';
import { validarEmail } from '../middlewares/validarEmail';
import { validarJwt } from "../middlewares/validarJWT";

const router = Router();

router.get('/renuevo' , [ validarJwt ], revalidarToken);
router.get('/', obtenerUsuarios);


router.post('/nuevo',
[
    check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail,
] , crearUsuario);




router.get('/:id', obtenerUsuario);

router.put('/:id',
[
    check('usuario', 'El nombre del usuario es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail().not().isEmpty(),
    check('password', 'El password debe contener mayusculas, minusculas, numeros y al menos un caracter especial').isStrongPassword(),
    validarCampos,
    validarEmail
] , actualizarUsuario );

router.post('/', [ validarJwt ], comprobarLogin);

router.delete('/:id', deleteUsuario);

export default router;

