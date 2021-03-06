const { authService, userService, encryptionService } = require('../Services');
const { ERRORS, response } = require('../constants');

const authController = {

    signUp: async (req, res) => {
        const { firstName, lastName, email, profile, password } = req.body;
        try {
            const hashedPassword = await encryptionService.encrypt(password);
            const newUser = await authService.addNewUser({
                firstName, lastName, email, profile, hashedPassword
            });
            res.status(201).json(response(newUser));
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },

    login: async (req, res) => {
        const duration = '3600000'; // miliseconds  
        try {
            const user = await userService.getUserByEmail(req.body.email);
            if (user.hasOwnProperty('notFound')) {
                return res.status(401).json(ERRORS.INPUT_FORMAT);
            }
            const token = await authService.generateUserToken(user);
            res
                .status(200)
                .header('auth-token', token)
                .json(response({ token, duration }));
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }

    },
};

module.exports = { authController };