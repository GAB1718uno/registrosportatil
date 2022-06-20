//import { DataTypes, Model, Sequelize } from 'sequelize';
/* import db from '../db/connection';


const sequelize = new Sequelize('cementerio','root','',{
    host:'localhost',
    dialect:'mariadb',
    // logging:false
});

class Usuario extends Model {}

Usuario.init({
  // Model attributes are defined here
  usuario: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING
    // allowNull defaults to true
  }
}, {
  // Other model options go here
  sequelize, // We need to pass the connection instance
  modelName: 'Usuario' // We need to choose the model name
});

export default Usuario; */

export interface IUser extends Model {
  id?: string,
  rol?:string,
  estado?:number,
  usuario?: string,
  password: string,
  email?: string,
  createdAt?:string,
  updateAt?: string
}


import { DataTypes, Model } from 'sequelize';
import db from '../db/connection';

const Usuario = db.define<IUser>('usuario', {
  
    usuario: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    }
});

export default Usuario


/* 
    {
        tableName:'usuarios',
        timestamps:false
    }

);


export default Usuario; */