import React, { useState, useEffect } from 'react';
import { fetchPlantCatalog } from '../api'; // Função para buscar o catálogo

const PlantCatalogModal = ({ onPlantSelect }) => {
    const [catalogPlants, setCatalogPlants] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlants, setFilteredPlants] = useState([]);

    useEffect(() => {
        // Busca as plantas do catálogo quando o componente é montado
        const loadCatalog = async () => {
            const plants = await fetchPlantCatalog();
            setCatalogPlants(plants);
        };
        loadCatalog();
    }, []);

    useEffect(() => {
        // Filtra as plantas com base no termo de pesquisa
        const filtered = catalogPlants.filter((plant) =>
            plant.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPlants(filtered);
    }, [searchTerm, catalogPlants]);

    return (
        <div>
            <input
                type="text"
                placeholder="Pesquisar planta"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="catalog-list">
                {filteredPlants.map((plant) => (
                    <div key={plant.id} onClick={() => onPlantSelect(plant)}>
                        {plant.name} ({plant.scientificName})
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PlantCatalogModal;
