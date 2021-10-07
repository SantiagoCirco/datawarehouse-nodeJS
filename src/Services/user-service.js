const { userRepository } = require('../Repositories');

const userService = {
    getUserById: async (id) => {
        const user = await userRepository.findById(id);
        if (!user) return { notFound: true };
        return user;
    },
    getUserByEmail: async (email) => {
        const user = await userRepository.findByEmail(email);
        if (!user) return { notFound: true };
        return user;
    },
    getAllUsers: async () => await userRepository.findAll(),

    updateUser: async (userData) => {
        const { id, firstName, lastName, email, profile, password } = userData;
        const user = await userRepository.findById(id);
        if (!user) return { notFound: true };
        await userRepository.update({
            id,
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            email: email || user.email,
            profile: profile || user.profile,
            password: password || user.password,
        });
        const updatedUser = await userRepository.findById(id);
        return updatedUser;
    },

    deleteUser: async (id) => {
        const user = await userRepository.findById(id);
        if (!user) return { notFound: true };
        await user.destroy();
        const deletedUser = { success: true };
        return deletedUser;
    },
};

module.exports = userService;