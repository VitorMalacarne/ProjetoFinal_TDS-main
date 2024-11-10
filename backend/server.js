require('dotenv').config();
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const plantRoutes = require('./routes/plantRoutes');
const authRoutes = require('./routes/authRoutes');
const catalogRoutes = require('./routes/plantCatalogRoutes');
const plantHistoryRoutes = require('./routes/plantHistoryRoutes');

// Outras rotas...



const app = express();
const PORT = process.env.PORT || 5000;


sequelize.sync({ force: false }).then(() => {
    console.log('Banco de dados sincronizado');
});

app.use(cors());
app.use(express.json({ extended: false }));

// Usar as rotas de plantas
app.use('/api/plants', plantRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/catalog', catalogRoutes);
app.use('/api/plants', plantHistoryRoutes);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});