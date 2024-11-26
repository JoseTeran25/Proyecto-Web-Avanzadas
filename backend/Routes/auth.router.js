import express from 'express';
import { signupHandler, loginHandler, recoverPasswordHandler, resetPasswordHandler} from '../Services/auth.service.js';

const router = express.Router();

// Ruta para Signup
router.post('/signup', signupHandler);

// Ruta para Login
router.post('/login', loginHandler);
//Ruta para actualizar contrasenia
router.post('/recover-password', recoverPasswordHandler);
router.post('/reset-password', resetPasswordHandler);


export default router;
