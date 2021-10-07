const { DataTypes } = require("sequelize");
const db = require("../Database/");
const Region = require('./Region');

const Country = db.define(
    "country",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        regionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Region,
                key: "id",
            },
        },
    },
    {
        tableName: "country",
        timestamps: false,
    }
);
module.exports = Country;