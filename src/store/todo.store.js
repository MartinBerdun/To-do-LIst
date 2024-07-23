import { Todo } from "../todos/models/todo.model"

//el store es para manrener la info en un espacio todo junto para poder consultarla en cualquier moemnto

const Filters = {
    All : 'all',
    Completed : 'Completed',
    Pending : 'Pending',
}

//esto es la creacion de los todos de forma predeterminada llamando a la instancia 
const state = {
    todos : [
        new Todo('Pieda del alma'),
        new Todo('Pieda del tiempo'),
        new Todo('Pieda del agua'),
        new Todo('Pieda del poder'),
        new Todo('Pieda del campo'),
    ],
    
    filter : Filters.All,
}

// es para llamar la informacion del storage para cargar la data y hacerla persistente

const initStore = ()=> {
    loadStore();
    console.log('Init store');
}

const loadStore = ()=> {
    if(!localStorage.getItem('state')) return;
    
    const {todos = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'));

    state.todos = todos;
    state.filter = filter;

}

const saveStateToLOcalStorage = () => {
    //EL JSON.stringify  es una funcion que convierte cualquier cosa en string
    localStorage.setItem('state', JSON.stringify(state));
}
 
const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos];
    case Filters.Completed:
        return state.todos.filter(todo => todo.done);

    case Filters.Pending:
        return state.todos.filter(todo => !todo.done)
        
    default: throw new Error(`Option ${filter} is not valid`);
            break;
    }
}

const addTodo = ( description )=> {

    if(!description) throw new Error(`Description must be provided`);

    state.todos.push(new Todo (description));
    saveStateToLOcalStorage();
}

//cambia el estado del todo de verdadero a falso
const toggleTodo = ( todoId )=> {

    //el map permite mediante el callback regresar el mismo valor que va a tener los elementos de ese arreglo y lo retorna en un nuevo arrgelo
    state.todos = state.todos.map(todo => {
        if(todo.id === todoId) {
            todo.done = !todo.done;
        }
    return todo;
    })
    saveStateToLOcalStorage();

}

const deleteTodo = ( todoId )=> {
    state.todos = state.todos.filter(todo => todo.id !== todoId );

    saveStateToLOcalStorage();


}

const deleteCompleted = () => {
    state.todos = state.todos.filter(todo => todo.done);
    saveStateToLOcalStorage();

}

const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLOcalStorage();


}

const getCurrentFilter = () => {
    return state.filter;

}
 
//se exportan para que sea accesible a otros archivos

export default {
    initStore,
    loadStore,
    addTodo,
    deleteTodo,
    getTodos,
    deleteCompleted,
    setFilter,
    getCurrentFilter,
    toggleTodo,
}