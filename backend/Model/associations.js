import User from './user.model.js';
import Course from './course.model.js';
import Enrollment from './enrollment.model.js';
import Grade from './grade.model.js';

// Relación: Un usuario (profesor) puede enseñar muchos cursos
User.hasMany(Course, { as: 'taughtCourses', foreignKey: 'professorId' });
Course.belongsTo(User, { as: 'professor', foreignKey: 'professorId' });

// Relación: Un usuario (estudiante) puede estar inscrito en muchos cursos
User.belongsToMany(Course, { through: Enrollment, foreignKey: 'userId', as: 'enrolledCourses' });
Course.belongsToMany(User, { through: Enrollment, foreignKey: 'courseId', as: 'students' });


// Relación: Un curso tiene muchas notas
Course.hasMany(Grade, { as: 'grades', foreignKey: 'courseId' });
Grade.belongsTo(Course, { foreignKey: 'courseId' });

// Relación: Un usuario (profesor) puede asignar muchas notas
User.hasMany(Grade, { as: 'assignedGrades', foreignKey: 'professorId' });
Grade.belongsTo(User, { as: 'professor', foreignKey: 'professorId' });

// Relación: Un usuario (estudiante) puede recibir muchas notas
User.hasMany(Grade, { as: 'receivedGrades', foreignKey: 'studentId' });
Grade.belongsTo(User, { as: 'student', foreignKey: 'studentId' });

export { User, Course, Enrollment, Grade };
