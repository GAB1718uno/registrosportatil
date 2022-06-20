import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

export interface IFallecido extends Model {
    id?:string,
    name?:string,
    apellido?:number,
    nacio?: string,
    mote?: string,
    fallecio?:string,
    url?:string,
    url2?:string,
    sepult?:string,
    createdAt?:string,
    updateAt?: string
  }

const Fallecido = db.define<IFallecido>('Fallecido', {
    name: {
        type: DataTypes.STRING
    },
    apellidos: {
        type: DataTypes.STRING
    },
    nacio: {
        type: DataTypes.STRING
    },
    fallecio: {
        type: DataTypes.STRING
    },
    mote: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    url2: {
        type: DataTypes.STRING
    }, 
    sepult: {
        type: DataTypes.STRING
    }
},
    {
        tableName:'muertos',
    }

);

export default Fallecido;