import React from "react";
import Item from './Item';

//Representa cada ítem individual.

//Muestra su valor y botones para editar o eliminar el ítem.


function List({items, deleteItem, editItem}){
    return(
        <ul>
            {items.map((item)=>(
                <Item
                key={item.id}
                item={item}
                deleteItem={deleteItem}
                editItem={editItem}
                />
            ))}
        </ul>
    );
};

export default List;