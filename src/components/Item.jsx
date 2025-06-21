import React from "react";

//Este componente muestra una lista de ítems.

//Por cada ítem se renderiza un componente Item, pasándole las funciones de eliminar y editar.

function Item({item, deleteItem, editItem}){
    return(
        <li>
            {item.value}
            <button onClick={()=> editItem(item)}>Editar</button>
            <button onClick={()=> deleteItem(item.id)}>Eliminar</button>
        </li>
    );
};

export default Item;