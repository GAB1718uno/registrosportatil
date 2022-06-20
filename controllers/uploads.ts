import { Request, Response } from "express";
import { v4 } from "uuid";
import actualizarImagen from "../helpers/actualizar-imagen";
import fs from "fs";
import path from "path";
import Uploads from "../models/uploads";


export const crearFile = async (req: Request, res: Response) => {

    const body = req.body
    const tipo = req.params.tipo.toLowerCase();
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];

    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        })
    }

    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }

    //Procesar archivo
    const file: any = req.files.file;
    console.log(file)
    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif']

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${v4()}.${extensionArchivo}`;

    console.log(file)
    console.log(nombreArchivo)

    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err: any) => {
        if (err) {
            return res.status(500).json(
                {
                    ok: false,
                    err
                })
        }

        res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            });
    });


    body.tipo = tipo;
    body.avatar = nombreArchivo;

    switch (tipo) {
        case 'usuarios':
            const usuario = Uploads.build(body);
            await usuario.save();
            console.log(usuario)
            break;

        case 'fallecidos':
            const fallecido = Uploads.build(body);
            await fallecido.save()
            res.status(200).json({
                ok: true,
                msg: 'Creado con exito',
                body

            })
            return true;
            break;
            
            case 'sepulturas':
                const sepultura = Uploads.build(body);
                await sepultura.save()
                res.status(200).json({
                    ok: true,
                    msg: 'Creado con exito',
                    body
    
                })
            console.log(sepultura)

            break;

        default:
            break;
    }
}

export const actualizarFile = (req: Request, res: Response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['usuarios', 'fallecidos', 'sepulturas'];

    //Validamos que el tipo sea correcto
    if (!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: ' El tipo de archivo no es correcto'
        })
    }

    //Validamos que exista un archivo en envio
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No files were uploaded.'
        });
    }


    // Procesar la carga de la imagen
    const file: any = req.files.imagen;

    const fileCortado = file.name.split('.');
    const extensionArchivo = fileCortado[fileCortado.length - 1]
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'svg', 'gif']

    if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok: false,
            msg: 'Extension de archivo no permitida'
        });
    }

    //Generar nombre del archivo
    const nombreArchivo = `${v4()}.${extensionArchivo}`;

    console.log(file)
    console.log(nombreArchivo)

    //path de archivo
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    //Mover
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, (err: any) => {
        if (err) {
            return res.status(500).json(
                {
                    ok: false,
                    err
                })
        }

        res.status(200).json(
            {
                ok: true,
                id,
                nombreArchivo
            });
    });

    actualizarImagen(id, tipo, nombreArchivo)

}


export const borramosDatosFile = async (req: Request, res: Response) => {

    const id = req.params.id;
    const tipo = req.params.tipo;

    const fallecidoFiles = await Uploads.findByPk(id);
    if (!fallecidoFiles) {
        return res.status(404).json({
            ok: false,
            msg: 'No existe usuario con el ID: ' + id
        })
    }

    await fallecidoFiles.destroy();
    res.json(fallecidoFiles)





}
export const mostrarDatosFile = async (req: Request, res: Response) => {

    const fallecidosUploads = await Uploads.findAll();
    res.json(fallecidosUploads)

}



export const mostrarFile = (req: Request, res: Response) => {

    const archivo = req.params.archivo;
    const tipo = req.params.tipo.toLowerCase();

    const pathFile = path.join(__dirname, `../uploads/${tipo}/${archivo}`);

    const pathFileCortado = pathFile.replace('dist', '')


    if (fs.existsSync(pathFileCortado)) {
        res.sendFile(pathFileCortado);
    } else {
        const pathFile = path.join(__dirname, `../uploads/no-image.png`);
        const pathFileCortado = pathFile.replace('dist', '')
        res.sendFile(pathFileCortado);
    }


}