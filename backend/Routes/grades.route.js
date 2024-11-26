import express from 'express';
import { createGrade,getGradesByCourse, getGradesByStudent,updateGrade,deleteGrade } from '../Services/grades.service.js';

const router = express.Router();

// Crear una nueva nota
router.post('/', createGrade);

// Obtener todas las notas de un estudiante
router.get('/student/:studentId', getGradesByStudent);

// Obtener todas las notas de un curso
router.get('/course/:courseId', getGradesByCourse);

// Actualizar una nota
router.put('/:gradeId', updateGrade);

// Eliminar una nota
router.delete('/:gradeId', deleteGrade);

export default router;
