const { DataTypes } = require("sequelize");
const db = require("../Database/");
const Country = require('./Country');

const City = db.define(
    "city",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        countryId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Country,
                key: "id",
            },
        },
    },
    {
        tableName: "city",
        timestamps: false,
    }
);
module.exports = City;