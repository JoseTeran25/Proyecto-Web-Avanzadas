import express from 'express';
import cors from 'cors';
import sequelize from './Sequalize/sequalize.js';
import AuthRouter from './Routes/auth.router.js'
import GradeRouter from './Routes/grades.route.js'


const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(express.json());

app.use('/auth',AuthRouter);
app.use('/grade',GradeRouter);

sequelize.sync({alter:true}) // Cambia a false para no borrar datos existentes
  .then(() => {
    console.log('Database synced successfully.');
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });