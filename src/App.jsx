import { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  // Estado que contiene la lista completa de estudiantes guardados
  const [students, setStudents] = useState([]);

  // Estado que contiene el estudiante seleccionado para edición
  const [studentToEdit, setStudentToEdit] = useState(null);

  const [isInitialized, setIsInitialized] = useState(false); // 🆕 Control de carga inicial
  
  // Al iniciar, cargamos los estudiantes almacenados en localStorage (si hay)
  useEffect(() => {
    try {
      const data = localStorage.getItem('students');
      console.log("🔥 Al cargar la app, localStorage tiene:", data);
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          setStudents(parsed);
        } else {
          console.warn('El contenido de localStorage no es un arreglo:', parsed);
        }
      } else {
        console.log('No hay datos previos en localStorage.');
      }
    } catch (error) {
      console.error('Error al cargar datos desde localStorage:', error);
    }
    setIsInitialized(true); // 🆕 Marcamos que ya cargamos
  }, []);

  // Guardar en localStorage solo después de la carga inicial
  useEffect(() => {
    if (isInitialized) {
      console.log("💾 Guardando en localStorage:", students);
      localStorage.setItem('students', JSON.stringify(students));
    }
  }, [students, isInitialized]);

  // Función que evalúa el promedio y devuelve la escala de apreciación correspondiente
  const calcularEscala = (promedio) => {
    if (promedio < 4) return 'Deficiente';
    if (promedio <= 5.5) return 'Con mejora';
    if (promedio <= 6.4) return 'Buen trabajo';
    return 'Destacado';
  };

  // Agrega un nuevo estudiante o actualiza uno existente
  const addOrUpdateStudent = (student) => {
    const escala = calcularEscala(student.promedio);
    const studentData = { ...student, escala };

    if (studentToEdit) {
      // Si hay un estudiante en edición, lo actualizamos en la lista
      setStudents(
        students.map((s) =>
          s.id === studentToEdit.id ? { ...studentData, id: s.id } : s
        )
      );
      setStudentToEdit(null);
    } else {
      // Si no, agregamos uno nuevo con un id único
      setStudents([...students, { ...studentData, id: Date.now() }]);
    }
  };

  // Elimina un estudiante de la lista por su ID
  const deleteStudent = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Carga los datos del estudiante para edición
  const editStudent = (student) => {
    setStudentToEdit(student);
  };

  // Render de la aplicación
  return (
    <div className="App">
      <h1>Evaluación de Alumnos</h1>

      {/* Subtítulo que cambia dinámicamente si se está agregando o editando */}
      <h2>{studentToEdit ? 'Editar Evaluación' : 'Agregar Nueva Evaluación'}</h2>

      {/* Formulario para ingresar o modificar datos de un estudiante */}
      <Form addOrUpdateStudent={addOrUpdateStudent} studentToEdit={studentToEdit} />

      {/* Subtítulo de la lista de estudiantes */}
      <h2>Evaluaciones Guardadas</h2>

      {/* Lista de estudiantes, o mensaje si aún no hay datos */}
      {students.length > 0 ? (
        <List students={students} deleteStudent={deleteStudent} editStudent={editStudent} />
      ) : (
        <p>No hay evaluaciones guardadas aún. ¡Agrega una!</p>
      )}
    </div>
  );
}

export default App;