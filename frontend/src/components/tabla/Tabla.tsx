'use client';

import { useEffect, useState } from "react";

interface Professor {
  id: number;
  name: string;
}

interface Grade {
  id: number;
  grade: string;
  professor: Professor;
}

interface Student {
  id: number;
  name: string;
  email: string;
  grades: Grade[];
}

interface Course {
  id: number;
  title: string;
  description: string;
  professor: Professor;
  students: Student[];
}

export const Tabla = () => {
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/grade/course/1");
        if (!response.ok) {
          throw new Error("Failed to fetch course data");
        }
        const data = await response.json();
  
        // Normalizar los datos para que coincidan con la interfaz Course
        const formattedCourse: Course = {
          id: Number(data.courseId), // Convertir a número
          title: `Course ${data.courseId}`, // No está en el JSON, se usa un placeholder
          description: "No description available", // Placeholder ya que el backend no lo envía
          professor: {
            id: data.students[0]?.grades[0]?.professor_id || 0, // Tomar el ID del primer profesor si hay notas
            name: "Unknown Professor", // No está en el JSON, placeholder
          },
          students: data.students.map((student: any) => ({
            id: student.id,
            name: student.name,
            email: student.email,
            grades: student.grades.map((grade: any) => ({
              id: grade.grade_id,
              grade: grade.grade, // Mantener como string, si se requiere número usar parseFloat(grade.grade)
              professor: {
                id: grade.professor_id,
                name: "Unknown Professor", // No se envía en el JSON, se usa placeholder
              },
            })),
          })),
        };
  
        setCourse(formattedCourse);
        console.log("Formatted Course:", formattedCourse);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  const handleAddGrade = async (studentId: number) => {
    const newGrade = prompt("Enter the grade to add:");
    if (!newGrade) return;

    try {
      const response = await fetch("http://localhost:4000/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: 1,
          professorId: course?.professor.id,
          studentId,
          grade: parseFloat(newGrade),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add grade");
      }

      alert("Grade added successfully!");
      // Refresh data
      const updatedStudentGrades = await fetch(
        `http://26.70.60.63:4000/grade/student/${studentId}`
      );
      const grades = await updatedStudentGrades.json();
      setCourse((prev) => {
        if (!prev) return null;
        const updatedStudents = prev.students.map((student) =>
          student.id === studentId ? { ...student, grades } : student
        );
        return { ...prev, students: updatedStudents };
      });
    } catch (err) {
      console.error(err);
      alert("Error adding grade.");
    }
  };

  const handleEditGrade = async (gradeId: number) => {
    const newGrade = prompt("Enter the new grade:");
    if (!newGrade) return;

    try {
      const response = await fetch(`http://localhost:4000/grade/${gradeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ grade: parseFloat(newGrade) }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit grade");
      }

      alert("Grade updated successfully!");
      // Refresh data (re-fetch course)
      const updatedResponse = await fetch("http://localhost:4000/grade/course/1");
      const updatedCourse = await updatedResponse.json();
      setCourse(updatedCourse.course);
    } catch (err) {
      console.error(err);
      alert("Error updating grade.");
    }
  };

  const handleDeleteGrade = async (gradeId: number) => {
    if (!confirm("Are you sure you want to delete this grade?")) return;

    try {
      const response = await fetch(`http://localhost:4000/grade/${gradeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete grade");
      }

      alert("Grade deleted successfully!");
      // Refresh data (re-fetch course)
      const updatedResponse = await fetch(`http://localhost:4000/grade/course/1`);
      const updatedCourse = await updatedResponse.json();
      setCourse(updatedCourse.course);
    } catch (err) {
      console.error(err);
      alert("Error deleting grade.");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (!course) {
    return <p>No course data available</p>;
  }

  return (
    <section className="bg-white">
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          {course.title} - Students
        </h1>
        <p className="mt-2 text-gray-600">{course.description}</p>
        <p className="mt-2 text-gray-800 font-medium">
          Professor: {course.professor.name}
        </p>

        <div className="mt-6 overflow-x-auto border border-gray-200 rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-gray-500">Student Name</th>
                <th className="px-4 py-3 text-left text-gray-500">Email</th>
                <th className="px-4 py-3 text-left text-gray-500">Grades</th>
                <th className="px-4 py-3 text-left text-gray-500">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {course.students.map((student) => (
                <tr key={student.id}>
                  <td className="px-4 py-3 text-gray-800">{student.name}</td>
                  <td className="px-4 py-3 text-gray-600">{student.email}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {student.grades.length > 0 ? (
                      <ul className="list-disc pl-5">
                        {student.grades.map((grade) => (
                          <li key={grade.id} className="flex items-center gap-2">
                            {grade.grade}
                            <button
                              className="text-blue-500 hover:underline"
                              onClick={() => handleEditGrade(grade.id)}
                            >
                              Edit
                            </button>
                            <button
                              className="text-red-500 hover:underline"
                              onClick={() => handleDeleteGrade(grade.id)}
                            >
                              Delete
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-gray-400">No grades available</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-gray-600">
                    <button
                      className="text-green-500 hover:underline"
                      onClick={() => handleAddGrade(student.id)}
                    >
                      Add Grade
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};