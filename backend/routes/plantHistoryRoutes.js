const express = require('express');
const router = express.Router();
const PlantHistoryController = require('../controllers/plantHistoryController');

// Rotas para o histórico de uma planta
router.post('/:plantId/history', PlantHistoryController.addHistory);
router.get('/:plantId/history', PlantHistoryController.getHistory);
router.put('/:plantId/history/:historyId', PlantHistoryController.updateHistory);
router.delete('/:plantId/history/:historyId', PlantHistoryController.deleteHistory);

module.exports = router;
