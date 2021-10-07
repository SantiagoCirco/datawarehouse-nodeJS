const { authService, userService, encryptionService } = require('../Services');
const { ERRORS } = require('../constants');

const authController = {

    signUp: async (req, res) => {
        const { firstName, lastName, email, profile, password } = req.body;
        try {
            const hashedPassword = await encryptionService.encrypt(password);
            const newUser = await authService.addNewUser({
                firstName, lastName, email, profile, hashedPassword
            });
            res.status(201).json(newUser);
        } catch (error) {
            console.log('ÁCA!');
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },

    login: async (req, res) => {
        const duration = '3600000'; // miliseconds  
        try {
            const user = await userService.getUserByEmail(req.body.email);
            if (user.hasOwnProperty('notFound')) {
                return res.status(404).json(ERRORS.USER_NOT_FOUND);
            }
            const token = await authService.generateUserToken(user);
            res
                .status(200)
                .header('auth-token', token)
                .json({ data: { token, duration } });
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }

    },
};

module.exports = { authController };