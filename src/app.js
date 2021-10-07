// Enviromental variables
require('dotenv').config();
// packages imports
const express = require('express');
const expressJwt = require('express-jwt');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');
// Services
const db = require('./Database/');
// Routes
const authRoute = require('./routes/auth');
const contactsRoute = require('./routes/contacts');
const usersRoute = require('./routes/users');
const regionsRoute = require('./routes/regions');
const companiesRoute = require('./Routes/companies');
// constants
const { ERRORS } = require('./constants');

const server = express();
const port = process.env.PORT || 3000;

db.authenticate()
    .then(() => console.log('Database connected!'))
    .catch(e => console.log('ERROR : ', e));

server.use(helmet());
server.use(compression());
server.use(express.json());
server.use(cors());
server.use(expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ["HS256"] })
    .unless({ path: ["/v1/auth/login", "/v1/auth/register"] }));

server.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(err.status).json(ERRORS.UNAUTHORIZED);
        return;
    }
    if (err.name === 'TokenExpiredError') {
        res.status(err.status).json(ERRORS.SESSION_EXPIRED);
        return;
    }
    next();
});

server.use('/v1/auth', authRoute);
server.use('/v1/contacts', contactsRoute);
server.use('/v1/users', usersRoute);
server.use('/v1/regions', regionsRoute);
server.use('/v1/companies', companiesRoute);

server.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = server;