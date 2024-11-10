const PlantCatalog = require('../models/plantCatalogModel');

// Criar uma nova planta no catálogo
exports.createPlantCatalog = async (req, res) => {
    try {
        const plant = await PlantCatalog.create(req.body);
        res.status(201).json(plant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Criar várias plantas no catálogo
exports.createMultiplePlantsCatalog = async (req, res) => {
    try {
        const plants = req.body; // Espera-se um array de plantas
        const savedPlants = await PlantCatalog.bulkCreate(plants, { validate: true });
        res.status(201).json(savedPlants);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Obter todas as plantas do catálogo
exports.getAllPlantsCatalog = async (req, res) => {
    try {
        const plants = await PlantCatalog.findAll();
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter uma planta específica por ID
exports.getPlantCatalogById = async (req, res) => {
    try {
        const plant = await PlantCatalog.findByPk(req.params.id);
        if (!plant) {
            return res.status(404).json({ message: 'Planta não encontrada' });
        }
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Atualizar uma planta do catálogo
exports.updatePlantCatalog = async (req, res) => {
    try {
        const [updated] = await PlantCatalog.update(req.body, {
            where: { id: req.params.id },
            returning: true
        });
        if (!updated) {
            return res.status(404).json({ message: 'Planta não encontrada' });
        }
        const updatedPlant = await PlantCatalog.findByPk(req.params.id);
        res.json(updatedPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Excluir uma planta do catálogo
exports.deletePlantCatalog = async (req, res) => {
    try {
        const deleted = await PlantCatalog.destroy({ where: { id: req.params.id } });
        if (!deleted) {
            return res.status(404).json({ message: 'Planta não encontrada' });
        }
        res.json({ message: 'Planta removida com sucesso' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
