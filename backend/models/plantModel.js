const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Para relacionar com o usuário

const Plant = sequelize.define('Plant', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastWatered: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wateringFrequency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    nextWatering: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        },
        allowNull: false
    },
    // Campos adicionais vindos do PlantCatalog
    scientificName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lightRequirement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    wateringRequirement: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fertilizingTips: {
        type: DataTypes.STRING,
        allowNull: true
    },
    pruningTips: {
        type: DataTypes.STRING,
        allowNull: true
    },
    commonDiseases: {
        type: DataTypes.TEXT, // Usa TEXT ao invés de VARCHAR
        allowNull: true,
        get() {
          const rawValue = this.getDataValue('commonDiseases');
          return rawValue ? JSON.parse(rawValue) : [];
        },
        set(value) {
          this.setDataValue('commonDiseases', JSON.stringify(value));
        }
    },
    soilType: {
        type: DataTypes.STRING,
        allowNull: true
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

module.exports = Plant;
