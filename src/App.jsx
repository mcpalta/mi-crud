import React, { useState, useEffect } from 'react';
import Form from './components/Form';
import List from './components/List';
import './App.css';

function App() {
  // Estado que guarda los elementos (ítems) del CRUD
  const [items, setItems] = useState([]);

  // Estado para guardar el ítem que se desea editar
  const [itemToEdit, setItemToEdit] = useState(null);

  // Al cargar la app, recupera los datos guardados en localStorage
  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    setItems(storedItems);
  }, []);

  // Cada vez que cambian los ítems, actualiza el localStorage
  useEffect(() => {
    localStorage.setItem('items', JSON.stringify(items));
  }, [items]);

  // Función para agregar o actualizar un ítem
  const addOrUpdateItem = (value) => {
    if (itemToEdit) {
      // Si se está editando, actualiza el ítem correspondiente
      setItems(items.map(item => item.id === itemToEdit.id ? { ...item, value } : item));
      setItemToEdit(null); // Limpia el ítem en edición
    } else {
      // Si no, agrega un nuevo ítem con un id único
      setItems([...items, { id: Date.now(), value }]);
    }
  };

  // Función para eliminar un ítem por su id
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Función para seleccionar un ítem para editar
  const editItem = (item) => {
    setItemToEdit(item);
  };

  // Renderizado principal
  return (
    <div className="App">
      <h1>CRUD con LocalStorage</h1>
      <Form
        addOrUpdateItem={addOrUpdateItem}
        itemToEdit={itemToEdit}
      />
      <List
        items={items}
        deleteItem={deleteItem}
        editItem={editItem}
      />
    </div>
  );
}

export default App;

