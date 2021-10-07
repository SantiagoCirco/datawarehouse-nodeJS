const { DataTypes } = require("sequelize");
const db = require("../Database/");
const City = require('./City');

const Company = db.define(
    "company",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cityId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: City,
                key: "id",
            },
        },
    },
    {
        tableName: "company",
        timestamps: false,
    }
);

module.exports = Company;