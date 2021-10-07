const { companyRepository } = require('../Repositories');

const companyService = {
    getAll: async () => await companyRepository.findAll(),
    create: async (companyData) => await companyRepository.create(companyData),
    update: async (id, data) => {
        const { name, adress, email, phone, cityId } = data;
        const company = await companyRepository.findById(id);
        await companyRepository.update(id, {
            name: name || company.name,
            adress: adress || company.adress,
            phone: phone || company.phone,
            email: email || company.email,
            cityId: cityId || company.cityId
        });
        const updatedCompany = await companyRepository.findById(id);
        return updatedCompany;
    },
    delete: async (id) => {
        await companyRepository.delete(id);
        return { succes: true };
    }
}

module.exports = companyService;