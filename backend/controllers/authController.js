const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // Verifica se o usuário já existe
        const user = await User.findOne({ where: { email } });
        if (user) {
            return res.status(400).json({ msg: 'Usuário já existe' });
        }

        // Cria um novo usuário
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        // Cria um payload para o JWT
        const payload = { user: { id: newUser.id } };

        // Gera um JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envia a resposta com o token e o nome do usuário
        res.json({ token, name: newUser.name });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};


exports.login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        // Encontra o usuário
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // Compara a senha
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Credenciais inválidas' });
        }

        // Cria um payload para o JWT
        const payload = { user: { id: user.id } };

        // Gera um JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Envia a resposta com o token e o nome do usuário
        res.json({ token, name: user.name });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erro no servidor');
    }
};
