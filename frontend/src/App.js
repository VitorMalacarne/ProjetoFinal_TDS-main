import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Register from './components/Register';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import PlantCreatePage from './pages/PlantCreatePage';
import PlantEditPage from './pages/PlantEditPage';
import PlantDetails from './pages/PlantDetails';
import PlantHistoryPage from './pages/PlantHistoryPage';

function App() {
  return (
      <Router>
          <main>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/dashboard" element={<PrivateRoute component={Dashboard} />} />
                  <Route path="/add-plant" element={<PrivateRoute component={PlantCreatePage} />} />
                  <Route path="/plants/:plantId/history" element={<PlantHistoryPage />} />
                  <Route path="/plant/:id" element={<PlantDetails />} />
                  <Route path="/plant/edit/:id" element={<PlantEditPage />} />
              </Routes>
          </main>
          <Footer />
      </Router>
  );
}

export default App;