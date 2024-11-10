import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlant } from '../api';
import Navbar from '../components/Navbar';
import { FaSun, FaTint, FaLeaf, FaWater, FaSeedling, FaBug } from 'react-icons/fa'; // Importação de ícones
import '../assets/plantdetails.css'; // Estilos personalizados
import defaultPlantImage from '../assets/default-plant.png';

const PlantDetails = () => {
    const { id } = useParams();
    const [plant, setPlant] = useState(null);

    useEffect(() => {
        const loadPlant = async () => {
            try {
                const plantData = await fetchPlant(id);
                setPlant(plantData);
            } catch (error) {
                console.error('Erro ao buscar planta:', error);
            }
        };

        loadPlant();
    }, [id]);

    if (!plant) {
        return <p>Carregando...</p>;
    }

    const today = new Date().toISOString().split('T')[0];
    const nextWateringDate = plant.nextWatering.split('T')[0];
    const isWateringDay = nextWateringDate === today;

    const toDay = plant.lastWatered.split('-')[2].split('T')[0];
    const toMonth = plant.lastWatered.split('-')[1];
    const toYear = plant.lastWatered.split('-')[0];

    const nextDay = plant.nextWatering.split('-')[2].split('T')[0];
    const nextMonth = plant.nextWatering.split('-')[1];
    const nextYear = plant.nextWatering.split('-')[0];

    const plantImage = plant.imageUrl || defaultPlantImage;

    return (
        <div className='wrapper'>
            <Navbar />

            <div className="container plant-details-container">
                <div className="row">
                    <div className="col-md-6">
                        <img src={plantImage} alt={plant.name} className="plant-image" />
                    </div>

                    <div className="col-md-6">
                        <h1 className="plant-title">{plant.name}</h1>

                        {isWateringDay && <p className="watering-alert">Hoje é dia de regar!</p>}

                        <div className="info-block">
                            <h3>Informações da Planta</h3>
                            <ul>
                                <li><strong>Última Rega:</strong> {(today.split('-')[0] === toYear) ? (toDay + "/" + toMonth) : (toDay + "/" + toMonth + "/" + toYear)}</li>
                                <li><strong>Próxima Rega:</strong> {(today.split('-')[0] === nextYear) ? (nextDay + "/" + nextMonth) : (nextDay + "/" + nextMonth + "/" + nextYear)}</li>
                                <li><strong>Intervalo de Rega:</strong> {plant.wateringFrequency} dias</li>
                            </ul>
                        </div>

                        {plant.scientificName ? (
                            <>
                                {/* Bloco com ícones e informações específicas */}
                                <div className="info-block">
                                    <FaSun className="info-icon" />
                                    <h3>Requisitos de Luz</h3>
                                    <p>{plant.lightRequirement}</p>
                                </div>

                                <div className="info-block">
                                    <FaTint className="info-icon" />
                                    <h3>Requisitos de Água</h3>
                                    <p>{plant.wateringRequirement}</p>
                                </div>

                                <div className="info-block">
                                    <FaSeedling className="info-icon" />
                                    <h3>Dicas de Fertilização</h3>
                                    <p>{plant.fertilizingTips}</p>
                                </div>

                                <div className="info-block">
                                    <FaLeaf className="info-icon" />
                                    <h3>Dicas de Poda</h3>
                                    <p>{plant.pruningTips}</p>
                                </div>

                                <div className="info-block">
                                    <FaWater className="info-icon" />
                                    <h3>Tipo de Solo</h3>
                                    <p>{plant.soilType}</p>
                                </div>

                                {plant.commonDiseases && plant.commonDiseases.length > 0 && (
                                    <div className="info-block">
                                        <FaBug className="info-icon" />
                                        <h3>Doenças Comuns</h3>
                                        <ul>
                                            {plant.commonDiseases.map((disease, index) => (
                                                <li key={index}>{disease}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="info-block">
                                <h3>Informações Adicionais</h3>
                                <p>Essa planta foi criada pelo usuário, sem informações adicionais do catálogo.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlantDetails;
