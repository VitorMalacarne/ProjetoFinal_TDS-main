import React, { useState } from 'react';
import '../assets/plantcard.css';
import { Link } from 'react-router-dom';
import defaultPlantImage from '../assets/default-plant.png';

function PlantCard({ id, name, lastWatered, wateringFrequency, nextWatering, onEdit, onDelete, onWaterPlant, imageUrl }) {
    const [waterDate, setWaterDate] = useState('');

    const handleWatering = () => {
        const dateToSet = waterDate || new Date().toISOString().split('T')[0];
        onWaterPlant(id, name, dateToSet, wateringFrequency);
        setWaterDate(''); // Limpar o campo após a ação
    };    

    const today = new Date().toISOString().split('T')[0];
    const nextWateringDate = nextWatering.split('T')[0];
    const isWateringDay = nextWateringDate === today;

    const toDay = lastWatered.split('-')[2].split('T')[0];
    const toMonth = lastWatered.split('-')[1];
    const toYear = lastWatered.split('-')[0];

    const nextDay = nextWatering.split('-')[2].split('T')[0];
    const nextMonth = nextWatering.split('-')[1];
    const nextYear = nextWatering.split('-')[0];

    const plantImage = imageUrl || defaultPlantImage;

    let visible = 'hidden';
    if(isWateringDay)
       visible = 'none';

    return (
        <div className="card shadow-sm">
            <img src={plantImage} className="card-img-top" alt={`Imagem de ${name}`} style={{ height: '200px', objectFit: 'cover' }} />
            <div className="card-body">
                <h5 className="card-title text-center">{name}</h5>
                <p className="card-text">
                    <strong>Última Rega:</strong> {(today.split('-')[0] === toYear) ? (toDay + "/" + toMonth) : (toDay + "/" + toMonth + "/" + toYear)}
                </p>
                <p className="card-text">
                    <strong>Dias entre regas:</strong> {wateringFrequency} dias
                </p>
                <p className="card-text">
                    <strong>Próxima rega:</strong> {(today.split('-')[0] === nextYear) ? (nextDay + "/" + nextMonth) : (nextDay + "/" + nextMonth + "/" + nextYear)}
                </p>
                    <div className="alert alert-info text-center" role="alert" style={{visibility: visible}}>
                        Hoje é dia de regar!
                    </div>

                <div className="mt-4">
                    <div className="d-flex flex-wrap justify-content-center gap-2">
                        <Link to={`/plant/${id}`} className="btn btn-outline-primary">
                            Ver Detalhes
                        </Link>
                        <Link to={`/plant/edit/${id}`} className="btn btn-outline-secondary">
                            Editar
                        </Link>
                        <button onClick={onDelete} className="btn btn-outline-danger">
                            Excluir
                        </button>
                        <Link to={`/plants/${id}/history`} className="btn btn-outline-primary">Ver Histórico</Link>
                    </div>
                </div>

                <div className="mt-3">
                    <label htmlFor="waterDate" className="form-label">Marcar Rega:</label>
                    <input
                        type="date"
                        className="form-control"
                        id="waterDate"
                        value={waterDate}
                        onChange={(e) => setWaterDate(e.target.value)}
                    />
                    <button onClick={handleWatering} className="btn btn-primary mt-2">
                        Marcar Rega
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PlantCard;
