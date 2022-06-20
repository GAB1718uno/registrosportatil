"use strict";
/* import fs from "fs"
import Uploads from '../models/uploads';

const guardarImagen = async(req:Request, res:Response, tipo:any) => {

    const body = req.pa

    console.log('Va todo bien')
    
    switch ( tipo ) {
        case 'usuarios':
            const usuario = Uploads.build(tipo);
            await usuario.save();
            console.log(usuario)
            break;
            
            case 'fallecidos':
                const fallecido = Uploads.build(tipo);
                await fallecido.save()
                return true;
                break;
                
                case 'sepulturas':
                    const sepultura = Uploads.build(tipo);
                    await sepultura.save()
                    console.log(sepultura)
        
          break;
      
        default:
          break;
      }

} */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = guardarImagen;
//# sourceMappingURL=guardar-imagen.js.map