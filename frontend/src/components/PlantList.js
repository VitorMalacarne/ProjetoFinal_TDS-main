import React, { useState, useEffect } from 'react';
import { fetchPlants, deletePlant } from '../api';
import PlantEditForm from './PlantEditForm';

const PlantList = () => {
    const [plants, setPlants] = useState([]);
    const [editingPlant, setEditingPlant] = useState(null);

    useEffect(() => {
        const getPlants = async () => {
            const plantData = await fetchPlants();
            setPlants(plantData);
        };
        getPlants();
    }, []);

    const handleDelete = async (id) => {
        await deletePlant(id);
        setPlants(plants.filter(plant => plant.id !== id));
    };

    const handleEdit = (plant) => {
        setEditingPlant(plant);
    };

    const handleSave = async () => {
        const updatedPlants = await fetchPlants();
        setPlants(updatedPlants);
        setEditingPlant(null);
    };

    return (
        <div>
            <h1>Plantas</h1>
            {editingPlant ? (
                <PlantEditForm 
                    plant={editingPlant} 
                    onSave={handleSave} 
                    onCancel={() => setEditingPlant(null)} 
                />
            ) : (
                <ul>
                    {plants.map(plant => (
                        <li key={plant.id}>
                            {plant.name} - Última rega: {new Date(plant.lastWatered).toLocaleDateString()}
                            <button onClick={() => handleEdit(plant)}>Editar</button>
                            <button onClick={() => handleDelete(plant.id)}>Deletar</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default PlantList;
