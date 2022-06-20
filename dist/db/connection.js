"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//Produccion
const db = new sequelize_1.Sequelize('cementerio', 'gilso', '', {
    host: '167.71.36.17',
    dialect: 'mariadb',
    //dialect:'mysql',
    // logging:false
});
//Desarrollo
/* const db = new Sequelize('cementerio','root','',{
    host:'localhost',
    dialect:'mariadb',
    //dialect:'mysql',
    // logging:false
});
 */
exports.default = db;
//# sourceMappingURL=connection.js.map