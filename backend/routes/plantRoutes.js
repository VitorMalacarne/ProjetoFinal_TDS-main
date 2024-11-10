const express = require('express');
const router = express.Router();
const plantController = require('../controllers/plantController');
const auth = require('../middleware/auth');

// Rota para obter todas as plantas
router.get('/', auth, plantController.getAllPlants);

// Rota para obter planta pelo ID
router.get('/:id', auth, plantController.getPlantById);

// Rota para adicionar planta
router.post('/', auth, plantController.createPlant);

// Rota para atualizar uma planta
router.put('/:id', auth, plantController.updatePlant);

// Rota para excluir uma planta
router.delete('/:id', auth, plantController.deletePlant);

// Rota para buscar plantas por nome
router.get('/search', auth, plantController.getPlantsByName);

module.exports = router;



