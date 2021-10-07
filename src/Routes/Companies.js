const express = require('express');
const router = express.Router();

const { companyController } = require('../controllers/company-controller');
const { middlewares } = require('../Middlewares');

router.get(
    '/',
    companyController.getAllCompanies
);

router.post(
    '/',
    middlewares.company.validateCompanyFields,
    middlewares.company.validateCityId,
    companyController.addNewCompany
);

router.put(
    '/:id',
    middlewares.company.validateCompanyExists,
    middlewares.company.validateCityId,
    companyController.updateCompany
);

router.delete(
    '/:id',
    middlewares.company.validateCompanyExists,
    companyController.deleteCompany
);


module.exports = router;