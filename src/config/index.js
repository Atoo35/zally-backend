const server = require('./server');
const pg = require('./pg');
const email = require('./email');

module.exports = {
    ...server,
    ...pg,
    ...email,
};
