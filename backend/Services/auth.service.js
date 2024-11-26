import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../Model/associations.js';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key'; // Configura tu clave secreta en .env
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS; // Configura en tu archivo .env


/**
 * Signup function: Handles HTTP request to create a new user.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const signupHandler = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email.' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user.' });
  }
};

/**
 * Login function: Handles HTTP request to authenticate a user and return a token.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const loginHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.log('User not found:', email);
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      SECRET_KEY,
      { expiresIn: '1d' } // Token expires in 1 day
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/**
 * Recuperar Contraseña: Envía un correo electrónico con el enlace para restablecer la contraseña.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const recoverPasswordHandler = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email is required.' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'No user found with this email.' });
    }

    // Generar hash del id del usuario
    const hashedId = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });

    const recoveryLink = `http://localhost:3000/recuperar?id=${hashedId}`;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Tu correo electrónico
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: EMAIL_USER,
      to: email,
      subject: 'Password Recovery',
      html: `
        <p>Hola ${user.name},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña. Haz clic en el enlace de abajo para continuar:</p>
        <a href="${recoveryLink}" target="_blank">${recoveryLink}</a>
        <p>Si no solicitaste este cambio, ignora este correo.</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Recovery email sent successfully.' });
  } catch (error) {
    console.error('Error sending recovery email:', error);
    res.status(500).json({ error: 'Error sending recovery email.' });
  }
};

/**
 * Actualizar contraseña: Recibe el hash, verifica el usuario y actualiza la contraseña.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 */
export const resetPasswordHandler = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ error: 'Token and new password are required.' });
    }

    // Decodificar el token para obtener el id del usuario
    let userId;
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      userId = decoded.id;
    } catch (error) {
      return res.status(400).json({ error: 'Invalid or expired token.' });
    }

    // Buscar al usuario en la base de datos
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Actualizar la contraseña del usuario
    await user.update({ password: hashedPassword });

    res.status(200).json({ message: 'Password updated successfully.' });
  } catch (error) {
    console.error('Error updating password:', error);
    res.status(500).json({ error: 'Error updating password.' });
  }
};