const { contactService } = require('../Services');
const { ERRORS } = require('../constants');

const contactController = {
    getAllContacts: async (req, res) => {
        try {
            const contacts = await contactService.getAll();
            res.status(200).json(contacts);
        } catch (error) {
            console.log(error);
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    addNewContact: async (req, res) => {
        const {
            firstName, lastName, email,
            adress, position, companyId,
            cityId, channels, avatar, interest } = req.body;
        try {
            const positionId = await contactService.getPositionIdFromDB(position);
            const contactBody = {
                firstName, lastName, email,
                adress, positionId, companyId,
                cityId, channels, avatar, interest
            }
            const newContact = await contactService.create(contactBody);
            res.status(200).json(newContact);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    updateContact: async (req, res) => {
        const id = req.params.id;
        const contactBody = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            adress: req.body.adress,
            email: req.body.email,
            interest: req.body.interest,
            avatar: req.body.avatar,
            positionId: req.body.positionId,
            companyId: req.body.companyId,
            cityId: req.body.cityId,
            channels: req.body.channels
        }
        try {
            const contactUpdated = await contactService.update(id, contactBody);
            res.status(200).json(contactUpdated);
        } catch (error) {
            console.log(error);
            if (error.name === 'NOT_CONTACT_CHANNEL_ASOCIATED') {
                return res.status(404).json(ERRORS.CHANNEL_NOT_FOUND);
            }
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    deleteContact: async (req, res) => {
        const id = req.params.id;
        try {
            const response = await contactService.delete(id);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
}

module.exports = { contactController };