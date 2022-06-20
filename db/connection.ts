import { Sequelize } from "sequelize";

//Produccion
const db = new Sequelize('cementerio','gilso','',{
    host:'167.71.36.17',
    dialect:'mariadb',
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
export default db;