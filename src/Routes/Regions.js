const express = require('express');
const router = express.Router();
const { locationController } = require('../controllers/location-controller');
const { middlewares } = require('../Middlewares');

// =============================
//          Regions
// =============================

router.get(
    '/',
    locationController.getAllRegions
);

router.post(
    '/',
    middlewares.location.validateRegionBodyAtributes,
    middlewares.location.checkRegionAlreadyExists,
    locationController.addNewRegion
);

router.put(
    '/:id',
    middlewares.location.validateRegionBodyAtributes,
    middlewares.location.validateRegionExists,
    locationController.updateRegion
);

router.delete(
    '/:id',
    middlewares.location.validateRegionExists,
    locationController.deleteRegion
);

// =============================
//          Countries
// =============================

router.get(
    '/countries',
    locationController.getAllCountries
);

router.post(
    '/countries',
    middlewares.location.validateCountryBodyAtributes,
    middlewares.location.validateRegionExists,
    middlewares.location.checkCountryAlreadyExists,
    locationController.addNewCountry
);

router.put(
    '/countries/:id',
    middlewares.location.validateRegionExists,
    locationController.updateCountry
);

router.delete(
    '/countries/:id',
    middlewares.location.validateRegionExists,
    locationController.deleteCountry
);

// =============================
//          Citie
// =============================

router.get(
    '/countries/cities',
    locationController.getAllCities
);

router.post(
    '/countries/cities',
    middlewares.location.validateCityBodyAtributes,
    middlewares.location.checkCityAlreadyExistsOrCountryNotFound,
    locationController.addNewCity
);


router.put(
    '/countries/cities/:id',
    middlewares.location.validateCountryExists,
    locationController.updateCity
);

router.delete(
    '/countries/cities/:id',
    middlewares.location.validateCountryExists,
    locationController.deleteCity
);


module.exports = router;