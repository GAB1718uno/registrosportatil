import { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const validarJwt = (req:any, res:any, next:NextFunction) => {

    const token  = req.header('x-token')

    console.log(token)

    try {
        
        if (!token) {
        return res.status(401).json({
            ok:false,
            msg: 'Token no encontrado'
        })

        
        }

        interface JwtPayload {
            uid: string,
            usuario:string,
            email:string
          }

        const { uid,usuario,email } = jwt.verify( token, process.env.SECRET_JWT_SEED!) as JwtPayload

        req.uid = uid;
        req.usuario = usuario;
        req.email = email
        /* console.log(uid,usuario)
        res.json({
            ok:true,
            msg:'Correcto',
            uid,
            usuario
        }) */
        
    } catch (error) {
        return res.status(401).json( {
            ok: false,
            msg: 'Token no válido'
    })
}


//If Todo sale bien
next();
}