const { userService, encryptionService, authService } = require('../Services');
const { ERRORS } = require('../constants');

async function validateAdminAuthorization(req, res, next) {
    try {
        if (!req.headers.authorization)
            return res.status(401).json(ERRORS.UNAUTHORIZED)
        const requestToken = req.headers.authorization.substring(7);
        const userId = authService.verifyUserToken(requestToken);
        const user = await userService.getUserById(userId);
        if (user.hasOwnProperty('notFound'))
            return res.status(404).json(ERRORS.INVALID_TOKEN);
        if (user.profile !== 'Admin')
            return res.status(401).json(ERRORS.NOT_ADMIN);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError')
            res.status(403).json(ERRORS.SESSION_EXPIRED);
        res.status(500).json(ERRORS.SERVER_ERROR);
    }
}

async function validateRegisterFields(req, res, next) {
    const { firstName, lastName, email, profile, password } = req.body;
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const error = {};
    (password.length < 6) &&
        (error.message = 'Password must be at least 6 characters long');
    if (!email.match(validRegex))
        (error.message = ' Must be a valid email ');
    if (!firstName || !lastName || !email || !profile || !password)
        (error.message = ' Fields are required ');
    if (Object.keys(error).length !== 0) return res.status(422).json(error)
    next();
}

async function validateLoginfields(req, res, next) {
    const { email, password } = req.body;
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!email || !password) return res.status(404).json(ERRORS.INPUT_FORMAT);
    if (!email.match(validRegex))
        return res.status(404).json(ERRORS.INVALID_EMAIL);
    next();
}

async function validateUserIfExists(req, res, next) {
    const { email } = req.body;
    try {
        const user = await userService.getUserByEmail(email);
        if (!user.hasOwnProperty('notFound'))
            return res.status(401).json(ERRORS.USER_EXISTS);
        next();
    } catch (error) {
        return res.status(500).json(ERRORS.SERVER_ERROR);
    }
}

async function validateUserLogin(req, res, next) {
    const { email, password } = req.body;
    const user = await userService.getUserByEmail(email);
    if (!user || user.hasOwnProperty('notFound'))
        return res.status(404).json(ERRORS.INVALID_LOGIN_CRED);
    const validPassword = await encryptionService.compare(password, user.password)
    if (!validPassword)
        return res.status(401).json(ERRORS.INVALID_LOGIN_CRED);
    next();
}

const auth = {
    validateAdminAuthorization,
    validateUserLogin,
    validateRegisterFields,
    validateUserIfExists,
    validateLoginfields
}

module.exports = auth;
