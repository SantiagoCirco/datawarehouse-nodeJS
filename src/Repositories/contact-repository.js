const { Contact, ContactChannels, Position, Channel } = require('../Models');
const { Op } = require("sequelize");

const contactRepository = {
    findContactById: async (id) => await Contact.findByPk(id, {
        include: [
            { model: Position },
            { model: Channel }
        ]
    }),
    findAll: async () => await Contact.findAll({
        include: [
            { model: Position },
            { model: Channel },
        ]
    }),
    findAllPositions: async () => await Position.findAll(),
    findAllChannels: async () => await Channel.findAll(),
    findPositionById: async (id) => await Position.findByPk(id),
    findChannelById: async (id) => { },
    createPosition: async (data) => await Position.create(data),
    createContact: async (data) => await Contact.create(data),
    createContactChannels: async (data) => await ContactChannels.create(data),
    updateContact: async (id, data) => await Contact.update(data, { where: { id: id } }),
    deleteContactChannels: async (contactId, channelId) => await ContactChannels.destroy({
        where: {
            [Op.and]: [
                { contactId: contactId },
                { channelId: channelId }
            ]
        }
    }),
    deleteContact: async (id) => await Contact.destroy({ where: { id: id } }),
}

module.exports = contactRepository;