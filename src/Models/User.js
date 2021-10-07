const { DataTypes } = require("sequelize");
const db = require("../Database/");

const User = db.define(
    "user",
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
        profile: {
            type: DataTypes.ENUM('Admin', 'Básico'),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "user",
        timestamps: false,
    }
);
module.exports = User;