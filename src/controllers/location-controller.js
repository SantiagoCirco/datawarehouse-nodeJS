const { locationService, companyService } = require('../Services');
const { ERRORS } = require('../constants');
const { locationRepository } = require('../Repositories');

const locationController = {
    getAllRegions: async (req, res) => {
        const regiones = await locationService.findAllRegions();
        res.status(200).json(regiones);
    },
    getAllCountries: async (req, res) => {
        const countries = await locationService.findAllCountries();
        res.status(200).json(countries);
    },
    getAllCities: async (req, res) => {
        const cities = await locationService.findAllCities();
        res.status(200).json(cities);
    },
    addNewRegion: async (req, res) => {
        const regionBody = { name: req.body.name };
        try {
            const regionAdded = await locationService.createNewRegion(regionBody);
            res.status(200).json(regionAdded);

        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }

    },
    addNewCountry: async (req, res) => {
        const countryBody = {
            name: req.body.name,
            regionId: req.body.regionId
        };
        try {
            const countryAdded = await locationService.createNewCountry(countryBody);
            res.status(200).json(countryAdded);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    addNewCity: async (req, res) => {
        const { name, countryId } = req.body;
        const cityBody = { name, countryId };
        try {
            const cityAdded = await locationService.createNewCity(cityBody);
            res.status(200).json(cityAdded);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    updateRegion: async (req, res) => {
        const id = req.params.id;
        const regionBody = {
            name: req.body.name
        }
        try {
            const regionUpdated = await locationService.updateRegion(id, regionBody);
            res.status(200).json(regionUpdated);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    updateCountry: async (req, res) => {
        const id = req.params.id;
        if (!id) return res.status(404).json(ERRORS.COUNTRY_NOT_FOUND);
        const countryBody = {
            name: req.body.name,
            regionId: req.body.regionId
        }
        try {
            const countryUpdated = await locationService.updateCountry(id, countryBody);
            res.status(200).json(countryUpdated);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    updateCity: async (req, res) => {
        const id = req.params.id;
        const cityBody = {
            name: req.body.name,
            countryId: req.body.countryId
        }
        try {
            const cityUpdated = await locationService.updateCity(id, cityBody);
            res.status(200).json(cityUpdated);
        } catch (error) {
            res.status(500).json(ERRORS.SERVER_ERROR);
        }
    },
    deleteRegion: async (req, res) => {
        const id = req.params.id;
        try {
            const companies = await companyService.getAll();
            const response = await locationService.deleteRegion(id, companies);
            res.status(200).json(response);
        } catch (error) {
            if (error.message === "HAS_COMPANY") {
                res.status(403).json(ERRORS.RESOURCE_NEEDED);
            } else {
                res.status(500).json(ERRORS.SERVER_ERROR);
            }
        }
    },
    deleteCountry: async (req, res) => {
        const id = req.params.id;
        try {
            const companies = await companyService.getAll();
            const response = await locationService.deleteCountry(id, companies);
            res.status(200).json(response);
        } catch (error) {
            if (error.message === "HAS_COMPANY") {
                res.status(403).json(ERRORS.RESOURCE_NEEDED);
            } else {
                res.status(500).json(ERRORS.SERVER_ERROR);
            }
        }
    },
    deleteCity: async (req, res) => {
        const id = req.params.id;
        try {
            const companies = await companyService.getAll();
            const response = await locationService.deleteCity(id, companies);
            res.status(200).json(response);
        } catch (error) {
            if (!error.message === "HAS_COMPANY") {
                return res.status(500).json(ERRORS.SERVER_ERROR);
            }
            return res.status(403).json(ERRORS.RESOURCE_NEEDED);

        }
    },
}

module.exports = { locationController };