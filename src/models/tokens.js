const { TOKEN_STATUS } = require('../common/constants');

module.exports = (sequelize, Sequelize) => {
    const Tokens = sequelize.define('tokens', {
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true,
            },
            allowNull: false,
        },
        access_token: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        type: {
            type: Sequelize.STRING,
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: TOKEN_STATUS.ACTIVE,
        },
    });

    return Tokens;
};
