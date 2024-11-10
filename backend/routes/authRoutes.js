const express = require('express');
const { check } = require('express-validator');
const authController = require('../controllers/authController');

const router = express.Router();

// Rota de registro
router.post(
    '/register',
    [
        check('name', 'Nome é obrigatório').not().isEmpty(),
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('password', 'Por favor, insira uma senha com 6 ou mais caracteres').isLength({ min: 6 })
    ],
    authController.register
);

// Rota de login
router.post(
    '/login',
    [
        check('email', 'Por favor, inclua um email válido').isEmail(),
        check('password', 'Senha é obrigatória').exists()
    ],
    authController.login
);

module.exports = router;
