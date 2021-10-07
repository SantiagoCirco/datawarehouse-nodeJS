const { User } = require('../Models');

const userRepository = {
    findById: async (id) => await User.findByPk(id),
    findAll: async () => await User.findAll(),
    findByEmail: async (email) => await User.findOne({ where: { email } }),
    createUser: async (userData) => {
        const { firstName, lastName, email, profile, password } = userData;
        return await User.create({ firstName, lastName, email, profile, password });
    },
    update: async (userData) => await User.update(
        userData, { where: { id: userData.id } }
    ),
    
}

module.exports = userRepository;