const { DataTypes } = require("sequelize");
const db = require("../Database/");

const Position = db.define(
    "position",
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        tableName: "position",
        timestamps: false,
    }
);

module.exports = Position;