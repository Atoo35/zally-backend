const { TOKEN_STATUS } = require('../common/constants');
const db = require('../models/index');

const Tokens = db.tokens;

const create = async (payload) => Tokens.create(payload);

const logout = async (email) => Tokens.update({
    status: TOKEN_STATUS.INACTIVE,
}, {
    where: {
        email,
    },
});

module.exports = {
    create,
    logout,
};
