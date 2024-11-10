const { Sequelize } = require('sequelize');

// Inicializa o Sequelize com SQLite
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'  // Onde o arquivo do banco de dados será armazenado
});

module.exports = sequelize;
