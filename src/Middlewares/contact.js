const { ERRORS } = require("../constants");
const { contactService, companyService, locationService } = require("../Services");


const contact = {
    checkBodyNotEmpty: (req, res, next) => {
        const {
            firstName, lastName, email,
            adress, position, companyId,
            cityId, channels, interest } = req.body;
        if (
            !firstName || !lastName ||
            !email || !adress ||
            !position || !companyId ||
            !cityId || !channels || !interest
        ) {
            return res.status(409).json(ERRORS.MISSING_FIELDS);
        }
        channels.forEach(c => {
            if (!c.id || !c.preference || !c.account) {
                return res.status(409).json(ERRORS.MISSING_FIELDS);
            }
        });
        next();
    },
    checkChannelsId: async (req, res, next) => {
        const { channels } = req.body;
        const channelsDB = await contactService.getAllChannels();
        channels.forEach(c => {
            const found = channelsDB.find(cDB => cDB.id == c.id);
            if (!found)
                return res.status(404).json(ERRORS.CHANNEL_NOT_FOUND);
        });
        next();
    },
    checkContactId: async (req, res, next) => {
        const id = req.params.id;
        const contact = await contactService.findById(id);
        if (!contact) return res.status(404).json(ERRORS.CONTACT_NOT_FOUND);
        next();
    },
    validateIds: async (req, res, next) => {
        const { positionId, companyId, cityId, channels } = req.body;
        if (channels) {
            if (channels.lenght !== 0) {
                const channelsDB = await contactService.getAllChannels();
                channels.forEach(channel => {
                    const found = channelsDB.find(cDB => cDB.id == channel.id);
                    if (!found) return res.status(404).json(ERRORS.CHANNEL_NOT_FOUND);
                });
            }
        }
        if (positionId) {
            const positionsDB = await contactService.getAllPositions();
            const found = positionsDB.find(p => p.id == positionId);
            if (!found)
                return res.status(404).json(ERRORS.POSITION_NOT_FOUND);
        }
        if (companyId) {
            const companiesDB = await companyService.getAll();
            const found = companiesDB.find(c => c.id == companyId);
            if (!found)
                return res.status(404).json(ERRORS.COMPANY_NOT_FOUND);
        }
        if (cityId) {
            const citiesDB = await locationService.getOnlyCities();
            const found = citiesDB.find(c => c.id == cityId);
            if (!found)
                return res.status(404).json(ERRORS.CITY_NOT_FOUND);
        }
        next();
    }
}

module.exports = contact;