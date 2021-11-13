const { locationRepository } = require('../Repositories');

const locationService = {
    findRegionById: async (id) => await locationRepository.findRegionById(id),
    findCountryById: async (id) => await locationRepository.findCountryById(id),
    findCityById: async (id) => await locationRepository.findCityById(id),
    findAllRegions: async () => await locationRepository.findAllRegions(),
    findAllCountries: async () => await locationRepository.findAllCountries(),
    findAllCities: async () => await locationRepository.findAllCities(),
    getOnlyCities: async (req, res) => await locationRepository.findOnlyCities(),
    createNewRegion: async (regionData) => await locationRepository.createNewRegion(regionData),
    createNewCountry: async (countryData) => await locationRepository.createNewCountry(countryData),
    createNewCity: async (cityData) => await locationRepository.createNewCity(cityData),
    updateRegion: async (id, data) => {
        await locationRepository.updateRegion(id, data);
        const updatedRegion = await locationRepository.findRegionById(id);
        return updatedRegion;
    },
    updateCountry: async (id, data) => {
        const { name, regionId } = data;
        const country = await locationRepository.findCountryById(id);
        await locationRepository.updateCountry(id, {
            name: name || country.name,
            regionId: regionId || country.regionId
        });
        const updatedCountry = await locationRepository.findCountryById(id);
        return updatedCountry;
    },
    updateCity: async (id, data) => {
        const { name, countryId } = data;
        const city = await locationRepository.findCityById(id);
        await locationRepository.updateCity(id, {
            name: name || city.name,
            countryId: countryId || city.countryId
        });
        const updatedCity = await locationRepository.findCityById(id);
        return updatedCity;
    },
    deleteRegion: async (id, companies) => {
        const locations = await locationRepository.findAllCities();
        const regionToDelete = locations.find(r => r.id == id);
        await Promise.all(regionToDelete.countries.map(async country => {
            await locationService.deleteCountry(country.id, companies);
        }));
        await regionToDelete.destroy();
        return { succes: true };

    },
    deleteCountry: async (id, companies) => {
        const { regionId } = await locationRepository.findCountryById(id);
        const locations = await locationRepository.findAllCities();
        const regionToDelete = locations.find(r => r.id == regionId);
        const countryToDelete = regionToDelete.countries.find(c => c.id == id);
        await Promise.all(countryToDelete.cities.map(async city => {
            await locationService.deleteCity(city.id, companies);
        })
        );
        await countryToDelete.destroy();
    },
    deleteCity: async (id, companies) => {
        const found = companies.find(comp => comp.id == id);
        if (found) {
            throw new Error('HAS_COMPANY');
        }
        const cityToDelete = await locationRepository.findCityById(id);
        await cityToDelete.destroy();
        return { succes: true };
    },
};

module.exports = locationService;