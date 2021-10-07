const { DataTypes } = require("sequelize");
const db = require("../Database");
const Channel = require('./Channel');
const Contact = require("./contact");

const ContactChannels = db.define(
    "contact_channels",
    {
        contactId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Contact,
                key: "id",
            },
        },
        channelId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Channel,
                key: "id",
            },
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        preference: {
            type: DataTypes.ENUM('No molestar','Sin preferencia','Canal favorito'),
            allowNull: false,
        },
    },
    {
        tableName: "contact_channels",
        timestamps: false,
    }
);
module.exports = ContactChannels;