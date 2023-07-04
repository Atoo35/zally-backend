/* eslint-disable no-console */
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const { errors } = require('celebrate');
const httpContext = require('express-http-context');
const cors = require('cors');

const app = express();
app.use(cors());

const config = require('./src/config');
const middlewares = require('./src/middlewares');
const routes = require('./src/routes');

app.use(httpContext.middleware);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);
app.use(errors());
app.use(middlewares.errorHandler);

// const db = require('./src/models');
// db.sequelize.sync({ alter: true }).then(() => {
//     console.log('Resync DB');
//     // populateDBWithPresetData();
// });
const server = http.createServer(app);
const PORT = config.server.port || process.env.PORT;
server.listen(PORT, '0.0.0.0', () => {
    console.info(`Server started on port ${PORT}`);
});

process.on('SIGINT', () => {
    server.close((err) => {
        if (err) {
            console.error(`Unable to close the server: ${err.message}`);
            process.exit(1);
        }
        console.info('Server stopped successfully');
        process.exit(0);
    });
});
