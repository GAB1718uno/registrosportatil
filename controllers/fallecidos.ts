import { Request, Response } from "express";
import { Op } from "sequelize";
import Fallecido from "../models/fallecido";
import Sepultura from "../models/sepultura"

/* export const obtenerFallecidosSepultura = async (req:Request, res:Response) => {
    const {id} = req.params;

    const fallecidossepultura = await Fallecido.findAll(
        {
            where: {sepultId:id}
        }
    )
    res.json(fallecidossepultura)
} */

export const obtenerRelacionado = async (req:Request, res:Response) => {

     const {sepult} = req.params
 
    console.log(sepult)
 
     const muerto = await Fallecido.findAll( {where: {sepult:sepult}} );
 
     try {
     if (!sepult){
        res.json(muerto) 
 }
return res.json(muerto) 

} catch (error) {
     console.log(error)
     res.status(500).json({
         msg: `Hable con el Administrador`
     })
      }
  }
 
 export const getFallecidosCriba = async (req: Request, res: Response) => {
    
    const tipo = req.params.tipo;
    const busqueda = req.params.termino;

switch (tipo) {
    case 'apellido':
        const fallecidos = await Fallecido.findAll(
            {   limit:10,
                where: { apellidos: {
                    [Op.like]: '%'+ busqueda + '%'
                } 
            }}
            )

            

            res.json(fallecidos)
        
        break;
        case 'sepultura':
            const fallecidosSep = await Fallecido.findAll(
                {   limit:10,
                    where: { sepult: {
                        [Op.like]: '%'+ busqueda + '%'
                    } 
                }}
                )
                res.json(fallecidosSep)
        
            break;

    default:
        res.status(400).json({
            msg: `Hable con el Administrador`
        })
} 
}

export const getFallecidos = async (req: Request, res: Response) => {

    
    const fallecidos = await Fallecido.findAll();
    res.json(fallecidos)

}

export const getFallecido = async (req: Request, res: Response) => {

    const { id } = req.params
    const fallecidos = await Fallecido.findByPk(id);
    res.json(fallecidos)

}

export const postFallecidos = async (req: Request, res: Response) => {

    const body = req.body
    console.log(body)

    try {
        const fallecidos = Fallecido.build(body)
        await fallecidos.save();
        console.log('Fallecido creado en base de datos')
        res.json(fallecidos)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        })

    }
}

export const putFallecido = async (req: Request, res: Response) => {
    const { body } = req
    const { id } = req.params

    try {
        const fallecido = await Fallecido.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun fallecido con el id ' + id
            })
        }

        await fallecido.update(body)
        res.json(fallecido)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
}

export const deleteFallecido = async (req: Request, res: Response) => {

    const { id } = req.params;

    try {
        const fallecido = await Fallecido.findByPk(id);
        if (!fallecido) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe usuario con el ID: ' + id
            })
        }

        await fallecido.destroy();
       res.json(fallecido)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: `Hable con el Administrador`
        });
    }
}