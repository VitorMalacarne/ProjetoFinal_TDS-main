import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import logo from '../assets/logo.png'; // Certifique-se de adicionar o caminho correto para a imagem da logo

function Navbar({ plants = [] }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // Estado para armazenar informações do usuário
  const today = new Date().toISOString().split('T')[0];

  // Função para verificar o login do usuário
  const checkUser = () => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token) {
        // Se o token existir, atualize o estado com o nome do usuário
        setUser({ name: userName });
    } else {
        setUser(null);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  let wateringTodayCount = 0;
  if (plants.length !== 0) {
    wateringTodayCount = plants.filter(
      (plant) => plant.nextWatering === today
    ).length;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="Logo" style={{ width: '150px' }} />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link">Olá, {user.name}</span>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Registrar
                  </Link>
                </li>
              </>
            )}
            <li className="nav-item">
              <Link className="nav-link" to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/add-plant">
                Adicionar Planta
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            <span className="navbar-text">
              {wateringTodayCount > 0 ? (
                <>
                  <i className="bi bi-droplet-fill text-primary me-1"></i>
                  Rega Hoje:{' '}
                  <span className="badge bg-info text-dark">
                    {wateringTodayCount}
                  </span>
                </>
              ) : (
                ''
              )}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;