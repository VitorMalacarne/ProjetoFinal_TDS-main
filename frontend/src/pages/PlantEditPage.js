import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchPlant, updatePlant } from '../api'; 
import Navbar from '../components/Navbar';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const EditPlantPage = () => {
  const { id } = useParams();
  const [plantData, setPlantData] = useState({
    name: '',
    lastWatered: '',
    wateringFrequency: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loadPlant = async () => {
      try {
        const plant = await fetchPlant(id);
        if (plant) {
          setPlantData({
            name: plant.name,
            lastWatered: plant.lastWatered,
            wateringFrequency: plant.wateringFrequency,
          });
        }
      } catch (error) {
        console.error('Erro ao buscar planta:', error);
        setError('Erro ao carregar informações da planta.');
      }
    };
    loadPlant();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!plantData.name || !plantData.lastWatered || !plantData.wateringFrequency) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await updatePlant(id, plantData);
      setSuccess('Planta atualizada com sucesso!');
      setTimeout(() => navigate(`/plant/${id}`), 2000); // Redireciona após 2 segundos
    } catch (error) {
      console.error('Erro ao atualizar planta:', error);
      setError('Erro ao atualizar planta. Tente novamente.');
    }
  };

  return (
    <div className='wrapper'>
      <Navbar />
      <Container className="mt-4">
        <h1 className="mb-4">Editar Planta</h1>

        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formPlantName" className="mb-3">
            <Form.Label>Nome da Planta:</Form.Label>
            <Form.Control
              type="text"
              value={plantData.name}
              onChange={(e) => setPlantData({ ...plantData, name: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="formLastWatered" className="mb-3">
            <Form.Label>
              Última Rega:
            </Form.Label>
            <Form.Control
              type="date"
              value={plantData.lastWatered}
              onChange={(e) => setPlantData({ ...plantData, lastWatered: e.target.value })}
              required
            />
          </Form.Group>

          <Form.Group controlId="formWateringFrequency" className="mb-3">
            <Form.Label>Intervalo de Rega (em dias):</Form.Label>
            <Form.Control
              type="number"
              value={plantData.wateringFrequency}
              onChange={(e) => setPlantData({ ...plantData, wateringFrequency: e.target.value })}
              required
            />
          </Form.Group>

          <Button type="submit" variant="primary">Salvar</Button>
        </Form>
      </Container>
    </div>
  );
};

export default EditPlantPage;
