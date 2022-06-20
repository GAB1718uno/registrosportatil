"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = __importDefault(require("../db/connection"));
const Fallecido = connection_1.default.define('Fallecido', {
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    apellidos: {
        type: sequelize_1.DataTypes.STRING
    },
    nacio: {
        type: sequelize_1.DataTypes.STRING
    },
    fallecio: {
        type: sequelize_1.DataTypes.STRING
    },
    mote: {
        type: sequelize_1.DataTypes.STRING
    },
    url: {
        type: sequelize_1.DataTypes.STRING
    },
    url2: {
        type: sequelize_1.DataTypes.STRING
    },
    sepult: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    tableName: 'muertos',
});
exports.default = Fallecido;
//# sourceMappingURL=fallecido.js.map