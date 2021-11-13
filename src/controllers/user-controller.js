
const { userService, encryptionService } = require('../Services');
const { ERRORS, response } = require('../constants');

const userController = {

    getAllUsers: async (req, res) => {
        try {

            const users = await userService.getAllUsers();
            res.status(200).json(response(users));

        } catch (error) {

            res.status(500).json(ERRORS.SERVER_ERROR);

        }
    },

    getUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await userService.getUserById(id);
            if (user.hasOwnProperty('notFound')) {
                return res.status(404).json(ERRORS.USER_NOT_FOUND);
            }
            res.status(200).json(response(user));
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },

    updateUserById: async (req, res) => {
        const id = req.params.id;
        const userData = {
            id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            profile: req.body.profile,
            password: req.body.password
        }
        if (userData.password) {
            const hashedPassword = await encryptionService.encrypt(password);
            userData.password = hashedPassword;
        }
        try {
            const updatedUser = await userService.updateUser(userData);
            if (updatedUser.hasOwnProperty('notFound')) {
                return res.status(404).json(ERRORS.USER_NOT_FOUND);
            }
            res.status(200).json(response(updatedUser));
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },

    deleteUserById: async (req, res) => {
        const id = req.params.id;
        try {
            const resp = await userService.deleteUser(id);
            if (resp.hasOwnProperty('notFound')) {
                return res.status(404).json(ERRORS.USER_NOT_FOUND);
            }
            res.status(200).json(response(resp));
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },

};

module.exports = { userController };
