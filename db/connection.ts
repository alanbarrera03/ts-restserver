import { Sequelize } from "sequelize";

const db = new Sequelize( 'node', 'root', 'H0w1m3ty0u4m0th34_*', {

    host: 'localhost',
    dialect: 'mysql'

} );

export default db;