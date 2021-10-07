const { DataTypes } = require("sequelize");
const db = require("../Database/");

const Region = db.define(
    "region",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "region",
        timestamps: false,
    }
);
module.exports = Region;