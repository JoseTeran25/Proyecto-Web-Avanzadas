import { Course, User, Grade, Enrollment } from '../Model/associations.js';
import sequelize from '../Sequalize/sequalize.js';

export const createGrade = async (req, res) => {
  try {
    const { courseId, professorId, studentId, grade } = req.body;

    // Validación básica
    if (!courseId || !professorId || !studentId || grade === undefined) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    const newGrade = await Grade.create({
      courseId,
      professorId,
      studentId,
      grade,
    });

    res.status(201).json({ message: 'Grade created successfully.', grade: newGrade });
  } catch (error) {
    console.error('Error creating grade:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las notas de un estudiante
export const getGradesByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;

    const grades = await Grade.findAll({ where: { studentId } });

    res.status(200).json(grades);
  } catch (error) {
    console.error('Error fetching grades for student:', error.message);
    res.status(500).json({ error: error.message });
  }
};
export const getGradesByCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;

        // Verificar que courseId existe y es un número válido
        if (!courseId || isNaN(courseId)) {
            return res.status(400).json({ error: 'Invalid course ID' });
        }

        // Consulta para obtener los detalles del curso, estudiantes y notas
        const query = `
            SELECT
                c.id AS course_id,
                c.title AS course_title,
                c.description AS course_description,
                u.id AS student_id,
                u.name AS student_name,
                u.email AS student_email,
                g.id AS grade_id,
                g.grade AS grade,
                p.id AS professor_id,
                p.name AS professor_name
            FROM
                "COURSES" c
            LEFT JOIN "ENROLLMENTS" e ON c.id = e."courseId"
            LEFT JOIN "USERS" u ON e."userId" = u.id
            LEFT JOIN "GRADES" g ON g."studentId" = u.id AND g."courseId" = c.id
            LEFT JOIN "USERS" p ON g."professorId" = p.id
            WHERE
                c.id = 1
        `;

        // Ejecutar la consulta
        const result = await sequelize.query(query, {
            replacements: [courseId],
            type: sequelize.QueryTypes.SELECT
        });

        // Si no hay resultados, devolver error de curso no encontrado
        if (result.length === 0) {
            return res.status(404).json({ error: 'Course not found.' });
        }

        // Procesar los resultados
        const courseDetails = {
            id: result[0].course_id,
            title: result[0].course_title,
            description: result[0].course_description,
            professor: {
                id: result[0].professor_id,
                name: result[0].professor_name
            },
            students: []
        };

        // Agrupar estudiantes y sus notas
        const studentsMap = new Map();

        result.forEach(row => {
            if (row.student_id) {
                // Crear estudiante si no existe
                if (!studentsMap.has(row.student_id)) {
                    studentsMap.set(row.student_id, {
                        id: row.student_id,
                        name: row.student_name,
                        email: row.student_email,
                        grades: []
                    });
                }

                // Añadir nota si existe
                if (row.grade_id) {
                    const student = studentsMap.get(row.student_id);
                    student.grades.push({
                        id: row.grade_id,
                        grade: row.grade,
                        professor: {
                            id: row.professor_id,
                            name: row.professor_name
                        }
                    });
                }
            }
        });

        // Convertir el mapa a array de estudiantes
        courseDetails.students = Array.from(studentsMap.values());

        res.status(200).json({ course: courseDetails });

    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una nota
export const updateGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;
    const { grade } = req.body;

    if (grade === undefined) {
      return res.status(400).json({ error: 'Grade is required to update.' });
    }

    const updatedGrade = await Grade.update(
      { grade },
      { where: { id: gradeId }, returning: true }
    );

    if (updatedGrade[0] === 0) {
      return res.status(404).json({ error: 'Grade not found.' });
    }

    res.status(200).json({ message: 'Grade updated successfully.', grade: updatedGrade[1][0] });
  } catch (error) {
    console.error('Error updating grade:', error.message);
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una nota
export const deleteGrade = async (req, res) => {
  try {
    const { gradeId } = req.params;

    const deleted = await Grade.destroy({ where: { id: gradeId } });

    if (!deleted) {
      return res.status(404).json({ error: 'Grade not found.' });
    }

    res.status(200).json({ message: 'Grade deleted successfully.' });
  } catch (error) {
    console.error('Error deleting grade:', error.message);
    res.status(500).json({ error: error.message });
  }
};
