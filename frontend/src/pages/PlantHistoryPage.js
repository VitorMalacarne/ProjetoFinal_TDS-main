import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchPlantHistory, addPlantHistory, updatePlantHistory, deletePlantHistory } from '../api';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

const PlantHistoryPage = () => {
    const { plantId } = useParams();
    const [history, setHistory] = useState([]);
    const [newEntry, setNewEntry] = useState({ actionType: '', description: '', date: '' });
    const [editingEntry, setEditingEntry] = useState(null);

    useEffect(() => {
        const loadHistory = async () => {
            try {
                const historyData = await fetchPlantHistory(plantId);
                setHistory(historyData);
            } catch (error) {
                console.error('Erro ao buscar histórico:', error);
            }
        };

        loadHistory();
    }, [plantId]);

    const handleAddEntry = async () => {
        // Verifica se todos os campos estão preenchidos
        if (!newEntry.actionType || !newEntry.description || !newEntry.date) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            const newHistoryEntry = await addPlantHistory(plantId, newEntry);
            setHistory([...history, newHistoryEntry]);
            setNewEntry({ actionType: '', description: '', date: '' });
        } catch (error) {
            console.error('Erro ao adicionar entrada:', error);
        }
    };

    const handleUpdateEntry = async (id, updatedEntry) => {
        // Verifica se todos os campos estão preenchidos
        if (!updatedEntry.actionType || !updatedEntry.description || !updatedEntry.date) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {
            await updatePlantHistory(plantId, id, updatedEntry);
            setHistory(history.map(entry => entry.id === id ? updatedEntry : entry));
            setEditingEntry(null);
        } catch (error) {
            console.error('Erro ao atualizar entrada:', error);
        }
    };

    const handleDeleteEntry = async (id) => {
        try {
            await deletePlantHistory(plantId, id);
            setHistory(history.filter(entry => entry.id !== id));
        } catch (error) {
            console.error('Erro ao excluir entrada:', error);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('T')[0].split('-');
        return `${day}-${month}-${year}`;
    };
    
    return (
        <div className='wrapper' style={{padding: '0px 0px 20px 0px'}}>
        <Navbar />
        <div className="container">
            <h1 className="my-4">Histórico da Planta</h1>
            <div className="mb-4">
                <h2>Adicionar Novo Evento</h2>
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label htmlFor="actionType" className="form-label">Tipo de Ação</label>
                        <select
                            id="actionType"
                            className="form-select"
                            value={newEntry.actionType}
                            onChange={(e) => setNewEntry({ ...newEntry, actionType: e.target.value })}
                            required
                        >
                            <option value="">Selecione o Tipo de Ação</option>
                            <option value="Poda">Poda</option>
                            <option value="Troca de Vaso">Troca de Vaso</option>
                            <option value="Fertilização">Fertilização</option>
                        </select>
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="description" className="form-label">Descrição</label>
                        <input
                            id="description"
                            type="text"
                            className="form-control"
                            placeholder="Descrição"
                            value={newEntry.description}
                            onChange={(e) => setNewEntry({ ...newEntry, description: e.target.value })}
                            required
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label htmlFor="date" className="form-label">Data</label>
                        <input
                            id="date"
                            type="date"
                            className="form-control"
                            value={newEntry.date}
                            onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                            required
                        />
                    </div>
                </div>
                <button className="btn btn-primary" onClick={handleAddEntry}>Adicionar</button>
            </div>
            <h2 className="mb-3">Histórico</h2>
            <ul className="list-group">
                {history.map(entry => (
                    <li key={entry.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{entry.actionType}: {entry.description} - {formatDate(entry.date)}</span>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingEntry(entry)}>Editar</button>
                            <button className="btn btn-danger btn-sm" onClick={() => handleDeleteEntry(entry.id)}>Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
            {editingEntry && (
                <div className="mt-4">
                    <h2>Editar Entrada</h2>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <label htmlFor="editActionType" className="form-label">Tipo de Ação</label>
                            <select
                                id="editActionType"
                                className="form-select"
                                value={editingEntry.actionType}
                                onChange={(e) => setEditingEntry({ ...editingEntry, actionType: e.target.value })}
                                required
                            >
                                <option value="Poda">Poda</option>
                                <option value="Troca de Vaso">Troca de Vaso</option>
                                <option value="Fertilização">Fertilização</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="editDescription" className="form-label">Descrição</label>
                            <input
                                id="editDescription"
                                type="text"
                                className="form-control"
                                value={editingEntry.description}
                                onChange={(e) => setEditingEntry({ ...editingEntry, description: e.target.value })}
                                required
                            />
                        </div>
                        <div className="col-md-4 mb-3">
                            <label htmlFor="editDate" className="form-label">Data</label>
                            <input
                                id="editDate"
                                type="date"
                                className="form-control"
                                value={editingEntry.date}
                                onChange={(e) => setEditingEntry({ ...editingEntry, date: e.target.value })}
                                required
                            />
                        </div>
                    </div>
                    <button className="btn btn-success me-2" onClick={() => handleUpdateEntry(editingEntry.id, editingEntry)}>Salvar</button>
                    <button className="btn btn-secondary" onClick={() => setEditingEntry(null)}>Cancelar</button>
                </div>
            )}
        </div>
        </div>
    );
};

export default PlantHistoryPage;
