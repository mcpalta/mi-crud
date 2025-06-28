import react from 'react';

function Item({ student, deleteStudent, editStudent }) {
  // Renderiza un estudiante con su nombre, asignatura, promedio y escala
  return (
    <li>
    <strong>Alumno: {student.nombre}</strong>
    Asignatura: {student.asignatura}<br />
    Promedio: {student.promedio}<br />
    <span className="badge">{student.escala}</span>
    <br />
    <button onClick={() => editStudent(student)}>Editar</button>
    <button onClick={() => deleteStudent(student.id)}>Eliminar</button>
    </li>
  );
}

export default Item;
