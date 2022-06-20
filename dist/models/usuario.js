"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Usuario = connection_1.default.define('usuario', {
    usuario: {
        type: sequelize_1.DataTypes.STRING
    },
    password: {
        type: sequelize_1.DataTypes.STRING
    },
    email: {
        type: sequelize_1.DataTypes.STRING
    }
});
exports.default = Usuario;
/*
    {
        tableName:'usuarios',
        timestamps:false
    }

);


export default Usuario; */ 
//# sourceMappingURL=usuario.js.map