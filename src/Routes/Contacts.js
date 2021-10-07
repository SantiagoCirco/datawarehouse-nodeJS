const express = require('express');
const router = express.Router();

const { contactController } = require('../controllers/contact-controller');
const { middlewares } = require('../Middlewares');

router.get(
    '/',
    contactController.getAllContacts  // IMPLEMENTER
);

router.post(
    '/',
    middlewares.contact.checkBodyFields, // IMPLEMENTAR
    middlewares.company.validateCityId,
    middlewares.company.validateCompanyExists,
    contactController.addNewContact  // IMPLEMENTER
);

router.put(
    '/:id',
    middlewares.contact.checkContactId, // IMPLEMENTAR
    contactController.updateContact  // IMPLEMENTER
);

router.delete(
    '/:id',
    middlewares.contact.checkContactId,   // IMPLEMENTER
    contactController.deleteContact   // IMPLEMENTER
);

module.exports = router;