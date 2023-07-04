const db = require('../models/index');

const healthCheck = (callback) => {
    db.sequelize.authenticate().then(() => {
        callback();
    }).catch((err) => {
        callback(err);
    });
};

module.exports = {
    healthCheck,
};
