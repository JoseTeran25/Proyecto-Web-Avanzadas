import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';
import sequelize from './Sequalize/sequalize.js';
import AuthRouter from './Routes/auth.router.js';
import GradeRouter from './Routes/grades.route.js';

const app = express();
const httpServer = createServer(app); // Crear servidor HTTP
const io = new Server(httpServer, {
  cors: {
    origin: '*', // Permitir cualquier origen. Configúralo según tu entorno.
    methods: ['GET', 'POST'],
  },
});

const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Rutas HTTP
app.use('/auth', AuthRouter);
app.use('/grade', GradeRouter);

// Configurar eventos de WebSocket
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Escuchar mensajes enviados por los clientes
  socket.on('chatMessage', (message) => {
    console.log('Message received:', message);

    // Reenviar el mensaje a todos los clientes conectados
    io.emit('chatMessage', message);
  });

  // Desconexión
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

// Iniciar servidor y sincronizar base de datos
sequelize
  .sync({ alter: true }) // Cambia a false para evitar alterar la BD en producción
  .then(() => {
    console.log('Database synced successfully.');
    httpServer.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });
