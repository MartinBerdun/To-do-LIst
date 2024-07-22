import { Todo } from "../todos/models/todo.model"

//el store es para manrener la info en un espacio todo junto para poder consultarla en cualquier moemnto

const Filters = {
    All : 'all',
    Completed : 'Completed',
    Pending : 'Pending',
}

const state = {
    todos : [
        new Todo('Pieda del alma'),
        new Todo('Pieda del tiempo'),
        new Todo('Pieda del agua')
    ],
    
    filter : Filters.All,
}

// es para llamar la informacion del storage para cargar la data y hacerla persistente

const initStore = ()=> {
    console.log(state);
    console.log('InitStore');
}

const loadStore = ()=> {
    throw new Error('Not implemented');
}

const addTodo = ( todo )=> {
    throw new Error('Not implemented');

}

const toggleTodo = ( todoId )=> {
    throw new Error('Not implemented');

}

const deleteTodo = ( todoId )=> {
    throw new Error('Not implemented');

}

const deleteCompleted = () => {
    throw new Error('Not implemented');

}

const setFilter = (newFilter = Filters.All) => {
    throw new Error('Not implemented');

}

const getCurrentFilter = () => {
    throw new Error('Not implemented');

}
 
//se exportan para que sea accesible a otros archivos

export default {
    initStore,
    loadStore,
    addTodo,
    deleteTodo,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    toggleTodo,
}