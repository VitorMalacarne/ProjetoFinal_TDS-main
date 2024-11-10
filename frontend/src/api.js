import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Função para obter todas as plantas
export const fetchPlants = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/plants`, {
            headers: {
                'x-auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar plantas:', error);
        throw error;
    }
};

export const fetchPlant = async (id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/plants/${id}`, {
            headers: {
                'x-auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar plantas:', error);
        throw error;
    }
};

export const fetchPlantCatalog = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_URL}/catalog`, {
            headers: {
                'x-auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar plantas:', error);
        throw error;
    }
};

// As outras funções (addPlant, updatePlant, deletePlant) também deveriam ter
// o cabeçalho de autorização conforme necessário, similar ao exemplo acima.


// Função para adicionar uma nova planta
export const addPlant = async (plant) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`${API_URL}/plants`, plant, {
            headers: {
                'x-auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao adicionar planta:', error);
        throw error;
    }
};

// Função para atualizar uma planta
export const updatePlant = async (id, plant) => {
    try {
        const token = localStorage.getItem('token');
        console.log("Id: " + id);
        console.log(plant);
        const response = await axios.put(`${API_URL}/plants/${id}`, plant, {
            headers: {
                'x-auth-token': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar planta:', error);
        throw error;
    }
};

// Função para deletar uma planta
export const deletePlant = async (id) => {
    try {
        console.log("degete sId: " + id);
        const token = localStorage.getItem('token');
        await axios.delete(`${API_URL}/plants/${id}`, {
            headers: {
                'x-auth-token': token,
            },
        });
    } catch (error) {
        console.error('Erro ao deletar planta:', error);
        throw error;
    }
};

export const fetchPlantHistory = async (plantId) => {
    const response = await axios.get(`${API_URL}/plants/${plantId}/history`);
    return response.data;
};

export const addPlantHistory = async (plantId, historyData) => {
    const response = await axios.post(`${API_URL}/plants/${plantId}/history`, historyData);
    return response.data;
};

export const updatePlantHistory = async (plantId, historyId, updatedData) => {
    const response = await axios.put(`${API_URL}/plants/${plantId}/history/${historyId}`, updatedData);
    return response.data;
};

export const deletePlantHistory = async (plantId, historyId) => {
    await axios.delete(`${API_URL}/plants/${plantId}/history/${historyId}`);
};