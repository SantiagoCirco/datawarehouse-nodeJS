const { companyService } = require('../Services');
const { ERRORS } = require('../constants');

const companyController = {
    getAllCompanies: async (req, res) => {
        try {
            const companies = await companyService.getAll();
            res.status(200).json(companies);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    addNewCompany: async (req, res) => {
        const companyBody = {
            name: req.body.name,
            adress: req.body.adress,
            email: req.body.email,
            phone: req.body.phone,
            cityId: req.body.cityId
        };
        try {
            const newCompany = await companyService.create(companyBody);
            res.status(200).json(newCompany);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }

    },
    updateCompany: async (req, res) => {
        const id = req.params.id;
        const companyBody = {
            name: req.body.name,
            adress: req.body.adress,
            email: req.body.email,
            phone: req.body.phone,
            cityId: req.body.cityId
        }
        try {
            const companyUpdated = await companyService.update(id, companyBody);
            res.status(200).json(companyUpdated);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    deleteCompany: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await companyService.delete(id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    }
}

module.exports = { companyController };