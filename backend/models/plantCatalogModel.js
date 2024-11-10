const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Certifique-se de ter configurado o arquivo de conexão `db.js`

const PlantCatalog = sequelize.define('PlantCatalog', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    wateringFrequency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    scientificName: {
        type: DataTypes.STRING,
        allowNull: false
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
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});

module.exports = PlantCatalog;
