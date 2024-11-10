const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PlantHistory = sequelize.define('PlantHistory', {
    plantId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Plants', // Nome da tabela de plantas
            key: 'id'
        }
    },
    actionType: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = PlantHistory;
