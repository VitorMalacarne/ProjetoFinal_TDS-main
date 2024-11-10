const PlantHistory = require('../models/plantHistoryModel');
const Plant = require('../models/plantModel');

// Controlador para adicionar uma entrada no histórico
exports.addHistory = async (req, res) => {
    const { plantId } = req.params;
    const { actionType, description, date } = req.body;

    try {
        // Verifica se a planta existe
        const plant = await Plant.findByPk(plantId);
        if (!plant) {
            return res.status(404).json({ msg: 'Planta não encontrada' });
        }

        // Cria uma nova entrada de histórico
        const historyEntry = await PlantHistory.create({
            plantId,
            actionType,
            description,
            date
        });

        res.status(201).json(historyEntry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Controlador para listar todas as entradas de histórico de uma planta específica
exports.getHistory = async (req, res) => {
    const { plantId } = req.params;

    try {
        // Verifica se a planta existe
        const plant = await Plant.findByPk(plantId);
        if (!plant) {
            return res.status(404).json({ msg: 'Planta não encontrada' });
        }

        // Busca todo o histórico relacionado à planta
        const history = await PlantHistory.findAll({
            where: { plantId },
            order: [['date', 'DESC']] // Ordenar por data, do mais recente ao mais antigo
        });

        res.json(history);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Controlador para excluir uma entrada de histórico
exports.deleteHistory = async (req, res) => {
    const { historyId } = req.params;

    try {
        // Verifica se a entrada de histórico existe
        const historyEntry = await PlantHistory.findByPk(historyId);
        if (!historyEntry) {
            return res.status(404).json({ msg: 'Entrada de histórico não encontrada' });
        }

        // Exclui a entrada de histórico
        await historyEntry.destroy();

        res.json({ msg: 'Entrada de histórico removida com sucesso' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};

// Controlador para editar uma entrada de histórico
exports.updateHistory = async (req, res) => {
    const { historyId } = req.params;
    const { actionType, description, date } = req.body;

    try {
        // Verifica se a entrada de histórico existe
        const historyEntry = await PlantHistory.findByPk(historyId);
        if (!historyEntry) {
            return res.status(404).json({ msg: 'Entrada de histórico não encontrada' });
        }

        // Atualiza a entrada de histórico
        historyEntry.actionType = actionType;
        historyEntry.description = description;
        historyEntry.date = date;

        await historyEntry.save();

        res.json(historyEntry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};
