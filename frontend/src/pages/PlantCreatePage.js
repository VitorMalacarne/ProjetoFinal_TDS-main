import React, { useState, useEffect } from 'react';
import { addPlant, fetchPlantCatalog } from '../api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { Container, Row, Col, Form, Button, ListGroup, Alert, Card, OverlayTrigger, Tooltip } from 'react-bootstrap';
import '../assets/plantcreatepage.css';
import { GoQuestion } from "react-icons/go";

const PlantCreatePage = () => {
    const [name, setName] = useState('');
    const [lastWatered, setLastWatered] = useState('');
    const [wateringFrequency, setWateringFrequency] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [plantCatalog, setPlantCatalog] = useState([]);
    const [selectedPlant, setSelectedPlant] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadPlantCatalog = async () => {
            try {
                const catalog = await fetchPlantCatalog(); 
                setPlantCatalog(catalog);
            } catch (error) {
                console.error('Erro ao buscar catálogo de plantas:', error);
            }
        };

        loadPlantCatalog();
    }, []);

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleCatalogSelection = (plant) => {
        setSelectedPlant(plant);
        setName(plant.name);
        setWateringFrequency(plant.wateringFrequency || ''); 
    };

    const handleClearSelection = () => {
        setSelectedPlant(null);
        setName('');
        setWateringFrequency('');
    };

    const filteredCatalog = plantCatalog.filter(plant => 
        plant.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        if (!name || !lastWatered || !wateringFrequency) {
            setError('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        const plantData = { 
            name, 
            lastWatered, 
            wateringFrequency,
            scientificName: selectedPlant ? selectedPlant.scientificName : '',
            lightRequirement: selectedPlant ? selectedPlant.lightRequirement : '',
            wateringRequirement: selectedPlant ? selectedPlant.wateringRequirement : '',
            fertilizingTips: selectedPlant ? selectedPlant.fertilizingTips : '',
            pruningTips: selectedPlant ? selectedPlant.pruningTips : '',
            commonDiseases: selectedPlant ? selectedPlant.commonDiseases : [],
            soilType: selectedPlant ? selectedPlant.soilType : '',
            imageUrl: selectedPlant ? selectedPlant.imageUrl : '',
        };

        try {
            await addPlant(plantData);
            navigate('/dashboard');  
        } catch (error) {
            console.error('Erro ao adicionar planta:', error);
            setError('Erro ao adicionar planta. Tente novamente.');
        }
    };

    return (
        <div className='wrapper'>
            <Navbar />
            <Container className="mt-4">
                <h1 className="mb-4">Adicionar Planta</h1>
                
                {/* Campo de pesquisa */}
                <Form.Control
                    type="text"
                    placeholder="Pesquisar no catálogo"
                    value={searchTerm}
                    onChange={handleSearch}
                    className="mb-4"
                />
                
                {/* Exibe resultados do catálogo */}
                {searchTerm && (
                    <ListGroup className="mb-4">
                        {filteredCatalog.slice(0, 6).map((plant) => (
                            <ListGroup.Item 
                                key={plant.id} 
                                onClick={() => handleCatalogSelection(plant)}
                                className="cursor-pointer d-flex align-items-center p-3"
                                style={{ border: '1px solid #ddd', borderRadius: '5px' }}
                            >
                                <img 
                                    src={plant.imageUrl || '../assets/default-plant.png'} 
                                    alt={plant.name} 
                                    style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '15px', borderRadius: '5px' }} 
                                />
                                <div>
                                    <h6 className="mb-0">{plant.name}</h6>
                                    <small>{plant.scientificName}</small>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}


                {/* Exibe detalhes da planta selecionada */}
                {selectedPlant && (
                    <Card className="mb-4 p-3 shadow-sm">
                        <Card.Body>
                            <Card.Title>Detalhes da Planta Selecionada</Card.Title>
                            <Row>
                                <Col md={4}>
                                    <Card.Img  
                                        src={selectedPlant.imageUrl || '../assets/default-plant.png'} 
                                        alt={selectedPlant.name} 
                                        style={{ width: '180px', height: '180px', objectFit: 'cover', margin: 'auto' }} 
                                    />
                                </Col>
                                <Col md={8}>
                                    <Card.Text><strong>Nome Científico:</strong> {selectedPlant.scientificName}</Card.Text>
                                    <Card.Text><strong>Requisitos de Luz:</strong> {selectedPlant.lightRequirement}</Card.Text>
                                    <Card.Text><strong>Quantidade de Água:</strong> {selectedPlant.wateringRequirement}</Card.Text>
                                    <Card.Text><strong>Dicas de Fertilização:</strong> {selectedPlant.fertilizingTips}</Card.Text>
                                    <Card.Text><strong>Dicas de Poda:</strong> {selectedPlant.pruningTips}</Card.Text>
                                    <Card.Text><strong>Tipo de Solo:</strong> {selectedPlant.soilType}</Card.Text>
                                </Col>
                            </Row>
                            <Button variant="secondary" className="mt-3" onClick={handleClearSelection}>Deselecionar Planta</Button>
                        </Card.Body>
                    </Card>
                )}

                {/* Formulário de criação de plantas */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formPlantName" className="mb-3">
                        <Form.Label>Nome da Planta:</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formLastWatered" className="mb-3">
                        <Form.Label>Última Rega:
                        <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip id="tooltip-last-watered">
                                        Informe a data da última vez que a planta foi regada. Se não souber a data exata, coloque a data atual.
                                    </Tooltip>
                                }
                            >
                                <span className="ms-2" style={{ fontSize: '1.2em', cursor: 'pointer' }}><GoQuestion /></span>
                            </OverlayTrigger>
                        </Form.Label>
                        <Form.Control
                            type="date"
                            value={lastWatered}
                            onChange={(e) => setLastWatered(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="formWateringFrequency" className="mb-3">
                        <Form.Label>Intervalo de Rega (em dias):</Form.Label>
                        <Form.Control
                            type="number"
                            value={wateringFrequency}
                            onChange={(e) => setWateringFrequency(e.target.value)}
                            required
                        />
                    </Form.Group>

                    {error && <Alert variant="danger">{error}</Alert>}

                    <Button type="submit" variant="primary">Adicionar Planta</Button>
                </Form>
            </Container>
        </div>
    );
};

export default PlantCreatePage;
