import React from 'react';
import Navbar from '../components/Navbar';
import { FaWater, FaLeaf, FaHistory } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o Bootstrap se ainda não estiver

function Home() {
    return (
        <div>
            <Navbar />
            <div className="container my-5">
                <header className="text-center mb-5">
                    <h1>Bem-vindo ao Greenthumb</h1>
                    <p className="lead">Gerencie e cuide do seu jardim com facilidade. Acompanhe o crescimento das suas plantas, receba alertas de rega, e muito mais!</p>
                </header>
                <section className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mb-5">
                    <div className="col">
                        <div className="card text-center">
                            <div className="card-body">
                                <FaWater className="display-4 text-primary mb-3" />
                                <h5 className="card-title">Alertas de Rega</h5>
                                <p className="card-text">Receba notificações quando suas plantas precisarem de água.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center">
                            <div className="card-body">
                                <FaLeaf className="display-4 text-success mb-3" />
                                <h5 className="card-title">Gerenciamento de Plantas</h5>
                                <p className="card-text">Adicione e gerencie suas plantas de forma eficiente.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="card text-center">
                            <div className="card-body">
                                <FaHistory className="display-4 text-info mb-3" />
                                <h5 className="card-title">Histórico de Ações</h5>
                                <p className="card-text">Veja e gerencie o histórico de ações das suas plantas.</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="text-center">
                    <h2 className="mb-4">Pronto para começar?</h2>
                    <p className="mb-4">Crie uma conta ou faça login para começar a gerenciar seu jardim hoje mesmo!</p>
                    <a href="/register" className="btn btn-primary me-2">Registrar</a>
                    <a href="/login" className="btn btn-secondary">Login</a>
                </section>
            </div>
        </div>
    );
}

export default Home;
