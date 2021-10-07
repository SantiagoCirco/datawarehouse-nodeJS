const bcrypt = require('bcrypt');

const encryptionService = {
    encrypt: async (password) => await bcrypt.hash(password, await bcrypt.genSalt(10)),
    compare: async (password, encryptedPassword) => await bcrypt.compare(password, encryptedPassword),
};

module.exports = encryptionService;