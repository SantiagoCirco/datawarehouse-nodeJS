const express = require('express');
const router = express.Router();

const { contactController } = require('../controllers/contact-controller');
const { middlewares } = require('../Middlewares');

router.get(
    '/',
    contactController.getAllContacts
);

router.post(
    '/',
    middlewares.contact.checkBodyNotEmpty,
    middlewares.contact.checkChannelsId,
    middlewares.company.validateCityId,
    middlewares.company.validateCompanyExists,
    contactController.addNewContact
);

router.put(
    '/:id',
    middlewares.contact.checkContactId,
    middlewares.contact.validateIds,
    contactController.updateContact
);

router.delete(
    '/:id',
    middlewares.contact.checkContactId,
    contactController.deleteContact
);

module.exports = router;