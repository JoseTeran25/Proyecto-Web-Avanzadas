import { DataTypes } from 'sequelize';
import sequelize from '../Sequalize/sequalize.js';

const Course = sequelize.define('Course', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  professorId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'USERS',
      key: 'id',
    },
  },
}, {
  tableName: 'COURSES',
  timestamps: false,
});

export default Course;
