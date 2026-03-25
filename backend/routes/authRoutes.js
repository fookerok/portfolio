const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Обработка POST запроса на /api/auth/login
router.post('/login', authController.login);

// Обработка GET запроса на /api/auth/setup-admin
router.get('/setup-admin', authController.setupAdmin);

module.exports = router;