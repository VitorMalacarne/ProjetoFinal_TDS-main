import React, { useState, useEffect } from 'react';
import { updatePlant } from '../api';

const PlantEditForm = ({ plant, onSave, onCancel }) => {
    const [name, setName] = useState(plant.name);
    const [lastWatered, setLastWatered] = useState(new Date(plant.lastWatered).toISOString().split('T')[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPlant = { name, lastWatered };
        await updatePlant(plant.id, updatedPlant);
        onSave();
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome da Planta:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label>Última Rega:</label>
                <input
                    type="date"
                    value={lastWatered}
                    onChange={(e) => setLastWatered(e.target.value)}
                />
            </div>
            <button type="submit">Salvar</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    );
};

export default PlantEditForm;
