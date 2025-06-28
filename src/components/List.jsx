import react from 'react';
import Item from './Item';

function List({ students, deleteStudent, editStudent }) {
  // Recorre todos los estudiantes y los pasa al componente Item
  return (
    <ul>
      {students.map((student) => (
        <Item
          key={student.id}
          student={student}
          deleteStudent={deleteStudent}
          editStudent={editStudent}
        />
      ))}
    </ul>
  );
}

export default List;