import { Request, Response } from 'express';
import Usuario from '../models/usuario';
import * as bcrypt from 'bcrypt'
import generarJwt from '../helpers/jwt';

export const comprobarLogin = async (req:Request, res:Response) => {

   const { email, password  }= req.body

   console.log(email,password)

    
   const usuario = await Usuario.findOne( {where: {email:email}} );

    //console.log(usuario.email)
 
    try {
    if (!usuario){
        return res.status(400).json({
            ok: false,
            msg: 'Email no encontrado'
        })
    }

    const validPassword = await bcrypt.compare( password, usuario.password )
    /* console.log(password)
    console.log(usuario.password)
    console.log(validPassword) */
    if (!validPassword){
        return res.status(400).json({
            ok: false,
            msg: 'Password no encontrado'
        })
    }

      //Generando Token/* 
  const token = await generarJwt(usuario.id, usuario.usuario, usuario.email);


  return res.status(201).json({
      ok:true,
      msg:"Logueado con éxito",
      uid: usuario.id,
      name: usuario.usuario,
      email:email,
      token
  })

} catch (error) {
    console.log(error)
    res.status(500).json({
        msg: `Hable con el Administrador`
    })
    
}

}


export const revalidarToken = async (req:any, res:Response) => {

    const { uid } = req

    //leer de la base de datos


    
    const bdUser = await Usuario.findByPk(uid)

    const user = bdUser?.usuario;
    const ema = bdUser?.email;

     //Generando Token/* 
     const token = await generarJwt(uid, user, ema);


    res.status(201).json({
        ok:true,
        msg:'Token renovado',
        uid: uid,
        name:user,
        email:ema,
        token
    })

    
}



export const obtenerUsuarios = async (req: Request, res: Response) => {

const usuarios = await Usuario.findAll();

    res.json(usuarios)

}

export const obtenerUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

    const usuario = await Usuario.findByPk( id );

    
    if(usuario) {
        res.json(usuario)
    } else {
        res.status(404).json({
            msg: `No existe un usuario con este ID`
        })
    }

}

export const crearUsuario = async (req: Request, res: Response) => {

 
    try {    
    const { body } = req;
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt)
    
    const usuario = await Usuario.create(body)
    /* const usuario = Usuario.build( req.body )
    
    await usuario.save(); */
    
    console.log(usuario.id)
     //Generando Token/* 
    const token = await generarJwt(usuario.id, usuario.usuario, usuario.email);

    res.status(201).json({
        ok:true,
        msg:"Usuario creado con éxito",
        uid: usuario.id,
        email:usuario.email,
        token
    })
              

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`,
            error
        })
        
    }
    
    

}

export const actualizarUsuario = async (req: Request, res: Response) => {

    const { body } = req;
    const { id } = req.params;

    try {

        const usuario = await Usuario.findByPk( id );
        if(!usuario){
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID'
            })
        }

        await usuario.update( body );
        res.json(usuario)
    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })
        
    }

}

export const deleteUsuario = async (req: Request, res: Response) => {

    const { id } = req.params;

try {

    const usuario = await Usuario.findByPk( id );

    if (!usuario){
        return res.status(404).json({
            ok:false,
            msg: 'No existe usuario con el ID: ' + id
        })
    }

    /* await usuario.update( { estado: false }) */

    await usuario.destroy();

    res.json(usuario)
    
} catch (error) 
{
    console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
    
});
}
}

