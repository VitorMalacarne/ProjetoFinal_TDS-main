const express = require('express');
const router = express.Router();
const PlantCatalogController = require('../controllers/plantCatalogController');

// Criar uma nova planta no catálogo
router.post('/', PlantCatalogController.createPlantCatalog);

// Criar várias plantas no catálogo
router.post('/sss', PlantCatalogController.createMultiplePlantsCatalog);


// Obter todas as plantas do catálogo
router.get('/', PlantCatalogController.getAllPlantsCatalog);

// Obter uma planta específica por ID
router.get('/:id', PlantCatalogController.getPlantCatalogById);

// Atualizar uma planta do catálogo
router.put('/:id', PlantCatalogController.updatePlantCatalog);

// Excluir uma planta do catálogo
router.delete('/:id', PlantCatalogController.deletePlantCatalog);

module.exports = router;
