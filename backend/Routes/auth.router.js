import express from 'express';
import { signupHandler, loginHandler } from '../Services/auth.service.js';

const router = express.Router();

// Ruta para Signup
router.post('/signup', signupHandler);

// Ruta para Login
router.post('/login', loginHandler);

export default router;
