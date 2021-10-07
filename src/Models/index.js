const User = require("./User");
const Region = require("./Region");
const Country = require("./Country");
const City = require("./City");
const Company = require("./Company");
const Channel = require("./Channel");
const ContactChannels = require("./ContactChannels");
const Position = require('./Position');
const Contact = require("./contact");
const db = require("../Database");

Region.hasMany(Country, {
    foreignKey: "regionId",
})

Country.hasMany(City, {
    foreignKey: "countryId",
})

City.hasMany(Company, {
    foreignKey: 'cityId'
})

Contact.belongsTo(Position, {
    foreignKey: "positionId",
});

Contact.belongsTo(Company, {
    foreignKey: "companyId",
});

Contact.belongsTo(City, {
    foreignKey: "cityID",
});

Contact.belongsToMany(Channel, {
    through: ContactChannels,
});
Channel.belongsToMany(Contact, {
    through: ContactChannels,
});

module.exports = {
    Region,
    Country,
    City,
    Company,
    Channel,
    ContactChannels,
    Position,
    Contact,
    User,
};