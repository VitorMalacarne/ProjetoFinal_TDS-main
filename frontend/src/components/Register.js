import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const { name, email, password } = formData;

    const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        try {
            const response = await axios.post('http://localhost:5000/api/auth/register', formData);
            localStorage.setItem('token', response.data.token); // Armazena o token JWT
            localStorage.setItem('userName', response.data.name);
            setSuccess('Registro bem-sucedido! Redirecionando...');
            setTimeout(() => window.location = '/', 2000); // Redireciona após 2 segundos
        } catch (error) {
            console.error('Erro ao registrar:', error);
            setError('Erro ao registrar. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div>
            <Navbar />
            <Container className="d-flex justify-content-center align-items-center min-vh-100">
                <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4">
                    <h1 className="mb-4 text-center">Registrar</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    {success && <Alert variant="success">{success}</Alert>}
                    <Form onSubmit={onSubmit}>
                        <Form.Group controlId="formName" className="mb-3">
                            <Form.Label>Nome:</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={onChange}
                                required
                            />
                        </Form.Group>
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
                        <Button type="submit" variant="primary" className="w-100">Registrar</Button>
                        <div className="mt-3 text-center">
                            <p>Já tem uma conta? <Link to="/login">Login</Link></p>
                        </div>
                    </Form>
                </Card>
            </Container>
        </div>
    );
};

export default Register;
