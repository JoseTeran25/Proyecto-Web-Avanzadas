import { Course, User, Grade } from '../Model/associations.js';


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
      const { courseId } = req.params;
      
  
      // Busca el curso y asocia estudiantes y sus notas
      const courseWithGrades = await Course.findOne({
        where: { id: courseId },
        attributes: ['id', 'title', 'description'], // Atributos del curso
        include: [
          {
            model: User, 
            as: 'students',
            attributes: ['id', 'name', 'email'], 
            through: { attributes: [] }, 
            include: [
              {
                model: Grade, 
                as: 'receivedGrades',
                attributes: ['id', 'grade'], 
                where: { courseId }, 
                required: false, 
              },
            ],
          },
        ],
      });
  
      if (!courseWithGrades) {
        return res.status(404).json({ error: 'Course not found.' });
      }
  
      res.status(200).json(courseWithGrades);
    } catch (error) {
      console.error('Error fetching grades for course:', error.message);
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
