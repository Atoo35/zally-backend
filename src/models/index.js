const Sequelize = require('sequelize');
const config = require('../config/index');

const sequelize = new Sequelize(config.pg.uri, {
    dialect: config.dialect,
    operatorsAliases: false,
    pool: {
        max: config.pg.max,
        min: config.pg.min,
        acquire: config.pg.acquire,
        idle: config.pg.idle,
    },
    logging: false,
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tokens = require('./tokens')(sequelize, Sequelize);

module.exports = db;
