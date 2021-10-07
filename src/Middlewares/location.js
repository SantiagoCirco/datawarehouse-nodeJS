const { locationService } = require('../Services');
const { ERRORS } = require('../constants');

const location = {

    validateRegionBodyAtributes: (req, res, next) => {
        const name = req.body.name;
        if (!name)
            return res.status(409).json(ERRORS.MISSING_FIELDS);
        next();
    },

    validateCountryBodyAtributes: (req, res, next) => {
        const { name, regionId } = req.body;
        if (!name || !regionId)
            return res.status(409).json(ERRORS.MISSING_FIELDS);
        next();
    },

    validateCityBodyAtributes: (req, res, next) => {
        const { name, countryId } = req.body;
        if (!name || !countryId)
            return res.status(409).json(ERRORS.MISSING_FIELDS);
        next();
    },

    validateRegionExists: async (req, res, next) => {
        const id = req.body.regionId || req.params.id;
        const region = await locationService.findRegionById(id);
        console.log(region);
        if (!region)
            return res.status(404).json(ERRORS.REGION_NOT_FOUND);
        next();
    },

    checkRegionAlreadyExists: async (req, res, next) => {
        const { name } = req.body;
        const regions = await locationService.findAllRegions();
        const region = regions.find(r => r.name === name);
        if (region)
            return res.status(403).json(ERRORS.REGION_ALREADY_EXISTS);
        next();
    },

    checkCountryAlreadyExists: async (req, res, next) => {
        const { name, regionId } = req.body;
        const countriesPerRegion = await locationService.findAllCountries();
        const countriesInRegion = countriesPerRegion.find(r => r.id == regionId);
        const countryAlreadyExists = countriesInRegion.countries.find(c => c.name === name);
        if (countryAlreadyExists)
            return res.status(403).json(ERRORS.COUNTRY_ALREADY_EXISTS);
        next();
    },

    validateCountryExists: async (req, res, next) => {
        const id = req.body.countryId || req.params.id;
        const country = await locationService.findCountryById(id);
        if (!country)
            return res.status(404).json(ERRORS.COUNTRY_NOT_FOUND);
        next();
    },

    checkCityAlreadyExistsOrCountryNotFound: async (req, res, next) => {
        const { name, countryId } = req.body;
        const country = await locationService.findCountryById(countryId);
        if (!country)
            return res.status(404).json(ERRORS.COUNTRY_NOT_FOUND);
        const cities = await locationService.findAllCities();
        const region = cities.find(r => r.id == country.regionId);
        const countryWithCities = region.countries.find(c => c.id == countryId);
        const cityAlreadyExists = countryWithCities.cities.find(c => c.name === name);
        if (cityAlreadyExists)
            return res.status(403).json(ERRORS.CITY_ALREADY_EXISTS);
        next();
    },

}

module.exports = location;