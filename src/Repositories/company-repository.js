const { Company } = require('../Models');

const companyRepository = {
    findAll: async () => await Company.findAll(),
    findById: async (id) => await Company.findByPk(id),
    create: async (data) => await Company.create(data),
    update: async (id, data) => await Company.update(data, { where: { id: id } }),
    delete: async (id) => await Company.destroy({ where: { id: id } }),
}

module.exports = companyRepository;