const { locationService, companyService } = require('../Services');
const { ERRORS } = require('../constants');

const company = {
    validateCompanyFields: async (req, res, next) => {
        const { name, adress, email, phone, cityId } = req.body;
        if (!name || !adress || !email || !phone || !cityId)
            return res.status(422).json(ERRORS.MISSING_FIELDS);
        next();
    },
    validateCityId: async (req, res, next) => {
        const cityId = req.body.cityId;
        if (cityId) {
            const cities = await locationService.getOnlyCities();
            const found = cities.find(c => c.id == cityId);
            if (!found)
                return res.status(404).json(ERRORS.CITY_NOT_FOUND);
        }
        next();
    },
    validateCompanyExists: async (req, res, next) => {
        const id = req.params.id;
        const companies = await companyService.getAll();
        const found = companies.find(c => c.id == id);
        if (!found)
            return res.status(404).json(ERRORS.COMPANY_NOT_FOUND);
        next();
    }
}

module.exports = company;