/*import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import { fetchPlants, updatePlant, deletePlant } from '../api';
import { Link } from 'react-router-dom';
import PlantForm from '../components/PlantForm';
import Navbar from '../components/Navbar';

function Dashboard() {
    const [plants, setPlants] = useState([]);
    const [editPlant, setEditPlant] = useState(null);

    // Função para carregar plantas
    const loadPlants = async () => {
        try {
            const data = await fetchPlants();
            setPlants(data);
        } catch (error) {
            console.error('Erro ao buscar plantas:', error);
        }
    };

    useEffect(() => {
        loadPlants();
    }, []);

    // Função para definir a planta a ser editada
    const handleEditPlant = (id) => {
        const plantToEdit = plants.find((plant) => plant.id === id);
        setEditPlant(plantToEdit);
    };

    // Função para limpar a planta em edição
    const handleCancelEdit = () => {
        setEditPlant(null);
    };

    // Função para atualizar a lista de plantas após uma edição ou exclusão
    const handlePlantUpdated = () => {
        loadPlants();
        setEditPlant(null);
    };

    // Função para excluir uma planta
    const handleDeletePlant = async (id) => {
        try {
            await deletePlant(id);
            loadPlants();
        } catch (error) {
            console.error('Erro ao excluir planta:', error);
        }
    };

    // Função para registrar a rega
    const handleWaterPlant = async (id, name, date, wateringFrequency) => {
        try {
            await updatePlant(id, { name:name, lastWatered: date, wateringFrequency: wateringFrequency });
            loadPlants();
        } catch (error) {
            console.error('Erro ao atualizar data da rega:', error);
        }
    };

    return (
        <div className="dashboard">
            <Navbar plants={plants}></Navbar>
            <h1>Suas Plantas</h1>
            <Link to="/add-plant">
                <button>Adicionar Planta</button>
            </Link>
            <div className="container">
            <div className="row">
                {plants.map((plant) => (
                <PlantCard 
                    key={plant.id}
                    id={plant.id}
                    name={plant.name}
                    lastWatered={plant.lastWatered}
                    wateringFrequency={plant.wateringFrequency}
                    nextWatering={plant.nextWatering}
                    onEdit={() => handleEditPlant(plant.id)}
                    onDelete={() => handleDeletePlant(plant.id)}
                    onWaterPlant={handleWaterPlant}
                    imageUrl={plant.imageUrl}
                />
                ))}
            </div>
            </div>
        </div>
    );
}

export default Dashboard;
*/

import React, { useEffect, useState } from 'react';
import PlantCard from '../components/PlantCard';
import { fetchPlants, updatePlant, deletePlant } from '../api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Dashboard() {
    const [plants, setPlants] = useState([]);
    const [editPlant, setEditPlant] = useState(null);

    // Função para carregar plantas
    const loadPlants = async () => {
        try {
            const data = await fetchPlants();
            setPlants(data);
        } catch (error) {
            console.error('Erro ao buscar plantas:', error);
        }
    };

    useEffect(() => {
        loadPlants();
    }, []);

    // Função para definir a planta a ser editada
    const handleEditPlant = (id) => {
        const plantToEdit = plants.find((plant) => plant.id === id);
        setEditPlant(plantToEdit);
    };

    // Função para limpar a planta em edição
    const handleCancelEdit = () => {
        setEditPlant(null);
    };

    // Função para atualizar a lista de plantas após uma edição ou exclusão
    const handlePlantUpdated = () => {
        loadPlants();
        setEditPlant(null);
    };

    // Função para excluir uma planta
    const handleDeletePlant = async (id) => {
        try {
            await deletePlant(id);
            loadPlants();
        } catch (error) {
            console.error('Erro ao excluir planta:', error);
        }
    };

    // Função para registrar a rega
    const handleWaterPlant = async (id, name, date, wateringFrequency) => {
        try {
            await updatePlant(id, { name, lastWatered: date, wateringFrequency });
            loadPlants();
        } catch (error) {
            console.error('Erro ao atualizar data da rega:', error);
        }
    };

    return (
        <div className='wrapper'>
        <div className="dashboard">
            <Navbar plants={plants}></Navbar>
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h1>Suas Plantas</h1>
                    {/* Botão de Adicionar Planta estilizado */}
                    <Link to="/add-plant">
                        <button className="btn btn-primary">Adicionar Planta</button>
                    </Link>
                </div>
                <div className="row">
                    {plants.length > 0 ? (
                        plants.map((plant) => (
                            <div key={plant.id} className="col-lg-4 col-md-6 mb-4">
                                <PlantCard 
                                    id={plant.id}
                                    name={plant.name}
                                    lastWatered={plant.lastWatered}
                                    wateringFrequency={plant.wateringFrequency}
                                    nextWatering={plant.nextWatering}
                                    onEdit={() => handleEditPlant(plant.id)}
                                    onDelete={() => handleDeletePlant(plant.id)}
                                    onWaterPlant={handleWaterPlant}
                                    imageUrl={plant.imageUrl}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="col-12">
                            <p className="text-center">Nenhuma planta cadastrada. Adicione sua primeira planta!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
        </div>
    );
}

export default Dashboard;
