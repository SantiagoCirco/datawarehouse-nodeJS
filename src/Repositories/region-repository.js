const { Region, Country, City } = require('../Models');

const locationRepository = {
    findAllRegions: async () => await Region.findAll(),
    findAllCountries: async () => await Region.findAll({
        include: {
            model: Country,
        },
    }),
    findAllCities: async () => await Region.findAll({
        include: {
            model: Country,
            include: { model: City }
        },
    }),
    findOnlyCities: async () => await City.findAll(),
    createNewRegion: async (data) => await Region.create(data),
    createNewCountry: async (data) => await Country.create(data),
    createNewCity: async (data) => await City.create(data),
    findRegionById: async (id) => await Region.findByPk(id),
    findCountryById: async (id) => await Country.findByPk(id),
    findCityById: async (id) => await City.findByPk(id),
    updateRegion: async (id, data) => await Region.update(data, { where: { id: id } }),
    updateCountry: async (id, data) => await Country.update(data, { where: { id: id } }),
    updateCity: async (id, data) => await City.update(data, { where: { id: id } }),
};

module.exports = locationRepository;