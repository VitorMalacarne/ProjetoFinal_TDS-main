/*const { addDays, format } = require('date-fns');
const Plant = require('../models/plantModel');

// Obter plantas do usuário
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.find({ user: req.user.id });
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter planta pelo ID
exports.getPlantById = async (req, res) => {
    const { id } = req.params;
    try {
        const plant = await Plant.findById(id);
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar planta
exports.createPlant = async (req, res) => {
    const { name, lastWatered, wateringFrequency, scientificName, lightRequirement, wateringRequirement, fertilizingTips, pruningTips, commonDiseases, soilType, imageUrl } = req.body;
    
    try {
        
        const lastWateredDate = new Date(lastWatered + "T00:00");
        const nextWateringDate = addDays(lastWateredDate, parseInt(wateringFrequency));
        const nextWatering = format(nextWateringDate, 'yyyy-MM-dd');

        const newPlant = new Plant({
            name,
            lastWatered,
            wateringFrequency,
            nextWatering,
            user: req.user.id,
            scientificName,
            lightRequirement,
            wateringRequirement,
            fertilizingTips,
            pruningTips,
            commonDiseases,
            soilType,
            imageUrl
        });

        const savedPlant = await newPlant.save();
        res.status(201).json(savedPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Atualizar planta
exports.updatePlant = async (req, res) => {
    const { id } = req.params;
    const { name, lastWatered, wateringFrequency } = req.body;

    try {
        const lastWateredDate = new Date(lastWatered + "T00:00");
        const nextWateringDate = addDays(lastWateredDate, parseInt(wateringFrequency));
        nextWatering = format(nextWateringDate, 'yyyy-MM-dd');

        const updatedPlant = await Plant.findOneAndUpdate(
            { _id: id, user: req.user.id },
            { name, lastWatered, wateringFrequency, nextWatering },
            { new: true, runValidators: true }
        );

        if (!updatedPlant) {
            return res.status(404).json({ message: 'Planta não encontrada ou não pertence ao usuário' });
        }

        res.json(updatedPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Excluir planta
exports.deletePlant = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPlant = await Plant.findOneAndDelete({ _id: id, user: req.user.id });

        if (!deletedPlant) {
            return res.status(404).json({ message: 'Planta não encontrada ou não pertence ao usuário' });
        }

        res.json({ message: 'Planta removida com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Buscar plantas por nome
exports.getPlantsByName = async (req, res) => {
    const { name } = req.query;

    try {
        const plants = await Plant.find({
            name: { $regex: name, $options: 'i' },
            user: req.user.id
        });
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
*/


const { addDays, format } = require('date-fns');
const Plant = require('../models/plantModel');

// Obter plantas do usuário
exports.getAllPlants = async (req, res) => {
    try {
        const plants = await Plant.findAll({ where: { userId: req.user.id } });
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Obter planta pelo ID
exports.getPlantById = async (req, res) => {
    const { id } = req.params;
    try {
        const plant = await Plant.findByPk(id);
        res.json(plant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Criar planta
exports.createPlant = async (req, res) => {
    const { name, lastWatered, wateringFrequency, scientificName, lightRequirement, wateringRequirement, fertilizingTips, pruningTips, commonDiseases, soilType, imageUrl } = req.body;
    
    try {
        const lastWateredDate = new Date(lastWatered + "T00:00");
        const nextWateringDate = addDays(lastWateredDate, parseInt(wateringFrequency));
        const nextWatering = format(nextWateringDate, 'yyyy-MM-dd');

        const newPlant = await Plant.create({
            name,
            lastWatered,
            wateringFrequency,
            nextWatering,
            userId: req.user.id,
            scientificName,
            lightRequirement,
            wateringRequirement,
            fertilizingTips,
            pruningTips,
            commonDiseases,
            soilType,
            imageUrl
        });

        res.status(201).json(newPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Atualizar planta
exports.updatePlant = async (req, res) => {
    const { id } = req.params;
    const { name, lastWatered, wateringFrequency } = req.body;

    console.log(req.body);

    try {
        const lastWateredDate = new Date(lastWatered + "T00:00");
        const nextWateringDate = addDays(lastWateredDate, parseInt(wateringFrequency));
        const nextWatering = format(nextWateringDate, 'yyyy-MM-dd');

        /*const [updated] = await Plant.update(
            { name, lastWatered, wateringFrequency, nextWatering },
            { where: { id, userId: req.user.id }, returning: true }
        );*/

        const [updatedCount, updatedPlants] = await Plant.update(
            { name, lastWatered, wateringFrequency, nextWatering },
            { 
              where: { id, userId: req.user.id },
              returning: true, // Retorna os dados atualizados
              plain: true // Retorna um objeto plano ao invés de array com instâncias
            }
        );

        console.log("updated: " + updatedCount);

        if (updatedCount === 0 /*!updated*/) {
            return res.status(404).json({ message: 'Planta não encontrada ou não pertence ao usuário' });
        }

        const updatedPlant = await Plant.findByPk(id);
        console.log("updatedPlant: " + updatedPlant);
        res.json(updatedPlant);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Excluir planta
exports.deletePlant = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Plant.destroy({ where: { id, userId: req.user.id } });

        if (!deleted) {
            return res.status(404).json({ message: 'Planta não encontrada ou não pertence ao usuário' });
        }

        res.json({ message: 'Planta removida com sucesso' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Buscar plantas por nome
exports.getPlantsByName = async (req, res) => {
    const { name } = req.query;

    try {
        const plants = await Plant.findAll({
            where: {
                name: { [Op.iLike]: `%${name}%` },
                userId: req.user.id
            }
        });
        res.json(plants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
