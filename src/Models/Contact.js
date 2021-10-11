const { DataTypes } = require("sequelize");
const db = require("../Database/");
const City = require("./City");
const Company = require('./Company');
const Position = require("./Position");

const Contact = db.define(
    "contact",
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        adress: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        interest: {
            type: DataTypes.ENUM('0', '25', '50', '75', '100'),
            allowNull: false,
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        positionId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Position,
                key: "id",
            },
        },
        companyId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Company,
                key: "id",
            },
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
        tableName: "contact",
        timestamps: false,
    }
);
module.exports = Contact;