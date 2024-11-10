import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', formData);
            localStorage.setItem('token', response.data.token); // Armazena o token JWT
            localStorage.setItem('userName', response.data.name);
            setSuccess('Login bem-sucedido! Redirecionando...');
            setTimeout(() => navigate('/'), 2000); // Redireciona após 2 segundos
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setError('Erro ao fazer login. Verifique suas credenciais e tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4">
                    <h1 className="mb-4 text-center">Login</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formEmail" className="mb-3">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword" className="mb-3">
                            <Form.Label>Senha:</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="primary" className="w-100">Login</Button>
                        <div className="mt-3 text-center">
                            <p>Não tem uma conta? <Link to="/register">Registrar</Link></p>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Login;
