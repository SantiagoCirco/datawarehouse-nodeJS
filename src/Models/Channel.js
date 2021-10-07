const { DataTypes } = require("sequelize");
const db = require("../Database/");

const Channel = db.define(
    "channel",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "channel",
        timestamps: false,
    }
);

module.exports = Channel;