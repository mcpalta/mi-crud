import react, { useState, useEffect } from 'react';

function Form({ addOrUpdateStudent, studentToEdit }) {
  // Estados individuales para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [asignatura, setAsignatura] = useState('');
  const [promedio, setPromedio] = useState('');

  // Si estamos editando, llenamos el formulario con los datos del estudiante
  useEffect(() => {
    if (studentToEdit) {
      setNombre(studentToEdit.nombre);
      setAsignatura(studentToEdit.asignatura);
      setPromedio(studentToEdit.promedio);
    } else {
      // Si no estamos editando, limpiamos los campos
      setNombre('');
      setAsignatura('');
      setPromedio('');
    }
  }, [studentToEdit]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedPromedio = parseFloat(promedio);

    // Validación de campos obligatorios y del rango del promedio
    if (!nombre || !asignatura || isNaN(parsedPromedio) || parsedPromedio < 1 || parsedPromedio > 7) {
      alert('Todos los campos son obligatorios y el promedio debe estar entre 1.0 y 7.0');
      return;
    }

    // Llama a la función para agregar o actualizar el estudiante
    addOrUpdateStudent({ nombre, asignatura, promedio: parsedPromedio });

    // Limpia el formulario después de enviar
    setNombre('');
    setAsignatura('');
    setPromedio('');
  };

  // Render del formulario
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre del alumno"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Asignatura"
        value={asignatura}
        onChange={(e) => setAsignatura(e.target.value)}
      />
      <input
        type="number"
        step="0.1"
        placeholder="Promedio"
        value={promedio}
        onChange={(e) => setPromedio(e.target.value)}
      />
      <button type="submit">{studentToEdit ? 'Actualizar' : 'Agregar'}</button>
    </form>
  );
}

export default Form;
