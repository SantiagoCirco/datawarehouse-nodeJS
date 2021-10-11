const { contactRepository } = require('../Repositories');

const contactService = {
    findById: async (id) => await contactRepository.findContactById(id),
    getAll: async () => await contactRepository.findAll(),
    create: async (data) => {
        const contactData = {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            adress: data.adress,
            interest: data.interest,
            avatar: data.avatar,
            positionId: data.positionId,
            companyId: data.companyId,
            cityId: data.cityId
        }
        const newContact = await contactRepository.createContact(contactData);
        await Promise.all(
            data.channels.map(async channel => {
                const contactChannelsData = {
                    channelId: channel.id,
                    contactId: newContact.id,
                    preference: channel.preference,
                    account: channel.account
                }
                await contactRepository.createContactChannels(contactChannelsData);
            })
        );
        const newContactWithChannels = await contactRepository.findContactById(newContact.id);
        return newContactWithChannels;
    },
    getPositionIdFromDB: async (position) => {
        const positions = await contactRepository.findAllPositions();
        const positionAlreadyExists = positions.find(pos =>
            pos.name.toUpperCase() === position.toUpperCase()
        );
        if (positionAlreadyExists) {
            return positionAlreadyExists.id;
        }
        const newPosition = await contactRepository.createPosition({ name: position });
        return newPosition.id;
    },
    update: async (id, data) => {
        const { firstName, lastName, adress, email, interest, avatar, positionId, companyId, cityId, channels } = data;
        const contact = await contactRepository.findContactById(id);
        await contactRepository.updateContact(id, {
            firstName: firstName || contact.firstName,
            lastName: lastName || contact.lastName,
            adress: adress || contact.adress,
            email: email || contact.email,
            interest: interest || contact.interest,
            avatar: avatar || contact.avatar,
            positionId: positionId || contact.positionId,
            companyId: companyId || contact.companyId,
            cityId: cityId || contact.cityId,
        });
        if (channels) {
            await Promise.all(
                channels.map(async channel => {
                    const { id, preference, account } = channel;
                    const currentChannel = contact.channels.find(c => c.id == id);
                    if (!currentChannel) {
                        const error = new Error('El canal de contacto no esta asociado al contacto actual');
                        error.name = 'NOT_CONTACT_CHANNEL_ASOCIATED';
                        throw error;
                    }
                    const contactChannelsBody = {
                        contactId: contact.id,
                        channelId: id,
                        preference: preference || currentChannel.contact_channels.preference,
                        account: account || currentChannel.contact_channels.account,
                    }
                    await contactRepository.deleteContactChannels(contact.id, id);
                    await contactRepository.createContactChannels(contactChannelsBody);
                })
            );
        }
        const updatedContact = await contactRepository.findContactById(id);
        return updatedContact;
    },
    delete: async (id) => {
        const contact = await contactRepository.findContactById(id);
        const channels = contact.channels;
        await Promise.all(channels.map(async (channel) => {
            await contactRepository.deleteContactChannels(contact.id, channel.id);
        }));
        await contactRepository.deleteContact(id);
        return { success: true };

    },
    getAllChannels: async () => await contactRepository.findAllChannels(),
    getAllPositions: async () => await contactRepository.findAllChannels(),
    findPositionById: async (id) => await contactRepository.findPositionById(id),
}

module.exports = contactService;