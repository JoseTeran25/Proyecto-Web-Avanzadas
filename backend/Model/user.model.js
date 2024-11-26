import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize/sequalize.js';

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('student', 'professor'),
    allowNull: false,
    defaultValue: 'student',
  },
}, {
  tableName: 'USERS', // Nombre de la tabla existente
  timestamps: false,
});

export default User;
