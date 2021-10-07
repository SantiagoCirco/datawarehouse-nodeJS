
const { Sequelize } = require('sequelize');
const { DB_CONFIG } = require('./config');

module.exports = new Sequelize(
    DB_CONFIG.database,
    DB_CONFIG.user,
    DB_CONFIG.password,
    {
        host: DB_CONFIG.host,
        dialect: 'mysql',
    }
);


