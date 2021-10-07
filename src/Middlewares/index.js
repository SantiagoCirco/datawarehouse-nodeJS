const auth = require('./auth');
const location = require('./location');
const company = require('./company');
const contact = require('./contact');

const middlewares = {
    auth,
    location,
    company,
    contact
}

module.exports = { middlewares };