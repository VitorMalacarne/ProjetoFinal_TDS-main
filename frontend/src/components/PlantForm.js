/*import React, { useState, useEffect } from 'react';
import { addPlant, updatePlant } from '../api';

const PlantForm = ({ onPlantAdded, plantToEdit, onCancelEdit }) => {
    const [name, setName] = useState('');
    const [lastWatered, setLastWatered] = useState('');
    const [wateringFrequency, setWateringFrequency] = useState('');

    useEffect(() => {
        if (plantToEdit) {
            setName(plantToEdit.name);
            setLastWatered(plantToEdit.lastWatered);
            setWateringFrequency(plantToEdit.wateringFrequency);
        } else {
            setName('');
            setLastWatered('');
            setWateringFrequency('');
        }
    }, [plantToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plantData = { name, lastWatered, wateringFrequency };
        
        try {
            if (plantToEdit) {
                await updatePlant(plantToEdit.id, plantData);
            } else {
                await addPlant(plantData);
            }
            setName('');
            setLastWatered('');
            setWateringFrequency('');
            onPlantAdded();
            onCancelEdit();  // Limpa a planta em edição após sucesso
        } catch (error) {
            console.error('Erro ao adicionar/atualizar planta:', error);
        }
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
            <div>
                <label>Intervalo de rega (em dias):</label>
                <input
                    type="number"
                    value={wateringFrequency}
                    onChange={(e) => setWateringFrequency(e.target.value)}
                />
            </div>

            <button type="submit">{plantToEdit ? 'Atualizar Planta' : 'Adicionar Planta'}</button>
            {plantToEdit && <button type="button" onClick={onCancelEdit}>Cancelar</button>}
        </form>
    );
};

export default PlantForm;
*/

import React, { useState, useEffect } from 'react';
import { addPlant, updatePlant } from '../api';
import PlantCatalogModal from './PlantCatalogModal'; // Modal para escolher do catálogo

const PlantForm = ({ onPlantAdded, plantToEdit, onCancelEdit }) => {
    const [name, setName] = useState('');
    const [lastWatered, setLastWatered] = useState('');
    const [wateringFrequency, setWateringFrequency] = useState('');
    const [catalogPlant, setCatalogPlant] = useState(null); // Planta escolhida do catálogo

    // Novos campos extras para salvar informações do catálogo
    const [scientificName, setScientificName] = useState('');
    const [lightRequirement, setLightRequirement] = useState('');
    const [wateringRequirement, setWateringRequirement] = useState('');
    const [fertilizingTips, setFertilizingTips] = useState('');
    const [pruningTips, setPruningTips] = useState('');
    const [commonDiseases, setCommonDiseases] = useState([]);
    const [soilType, setSoilType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        if (plantToEdit) {
            setName(plantToEdit.name);
            setLastWatered(plantToEdit.lastWatered);
            setWateringFrequency(plantToEdit.wateringFrequency);
            // Limpa a escolha do catálogo
            setCatalogPlant(null); 
        } else {
            setName('');
            setLastWatered('');
            setWateringFrequency('');
            setCatalogPlant(null);
        }
    }, [plantToEdit]);

    const handleCatalogSelection = (plant) => {
        setCatalogPlant(plant); // Define a planta selecionada do catálogo
        setName(plant.name);
        setWateringFrequency(plant.wateringFrequency);
        setScientificName(plant.scientificName);
        setLightRequirement(plant.lightRequirement);
        setWateringRequirement(plant.wateringRequirement);
        setFertilizingTips(plant.fertilizingTips);
        setPruningTips(plant.pruningTips);
        setCommonDiseases(plant.commonDiseases);
        setSoilType(plant.soilType);
        setImageUrl(plant.imageUrl);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const plantData = {
            name: catalogPlant ? catalogPlant.name : name,
            lastWatered,
            wateringFrequency: catalogPlant ? catalogPlant.wateringFrequency : wateringFrequency,
            scientificName: catalogPlant ? scientificName : '', // Salva as infos do catálogo, se houver
            lightRequirement: catalogPlant ? lightRequirement : '',
            wateringRequirement: catalogPlant ? wateringRequirement : '',
            fertilizingTips: catalogPlant ? fertilizingTips : '',
            pruningTips: catalogPlant ? pruningTips : '',
            commonDiseases: catalogPlant ? commonDiseases : [],
            soilType: catalogPlant ? soilType : '',
            imageUrl: catalogPlant ? imageUrl : '',
        };
        
        try {
            if (plantToEdit) {
                await updatePlant(plantToEdit.id, plantData);
            } else {
                await addPlant(plantData);
            }
            setName('');
            setLastWatered('');
            setWateringFrequency('');
            onPlantAdded();
            onCancelEdit();  // Limpa a planta em edição após sucesso
            console.log(plantData);
        } catch (error) {
            console.error('Erro ao adicionar/atualizar planta:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nome da Planta:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={catalogPlant !== null} // Desativa o campo se uma planta for selecionada
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
            <div>
                <label>Intervalo de rega (em dias):</label>
                <input
                    type="number"
                    value={wateringFrequency}
                    onChange={(e) => setWateringFrequency(e.target.value)}
                    disabled={catalogPlant !== null}
                />
            </div>

            <button type="submit">
                {plantToEdit ? 'Atualizar Planta' : 'Adicionar Planta'}
            </button>
            {plantToEdit && (
                <button type="button" onClick={onCancelEdit}>
                    Cancelar
                </button>
            )}
            
            <PlantCatalogModal onPlantSelect={handleCatalogSelection} />
        </form>
    );
};

export default PlantForm;
