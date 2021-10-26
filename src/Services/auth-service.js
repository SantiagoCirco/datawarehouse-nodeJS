const jwt = require('jsonwebtoken');
const { userRepository } = require('../Repositories');

const authService = {

    addNewUser: async (userData) => {
        if (userData.profile !== 'Admin' && userData.profile !== 'Básico')
            userData.profile = 'Básico';
        const { firstName, lastName, email, profile, hashedPassword: password } = userData;
        return await userRepository.createUser({
            firstName,
            lastName,
            email,
            profile,
            password
        });
    },

    generateUserToken: async (user) => {
        const expiresIn = '15m';
        const token = jwt.sign({
            name: user.email,
            id: user.id
        }, process.env.SECRET_TOKEN, { expiresIn });
        return token;
    },

    verifyUserToken: (token) => jwt.verify(token, process.env.SECRET_TOKEN).id,

}

module.exports = authService;