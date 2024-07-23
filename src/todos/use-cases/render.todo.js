





//el elemento del html dodnde se van a renderizar los elementos y los todos son los parametros que recibe la funcion

import { createTodoHtml } from "./create-todo-html.js";

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */
export const renderTodos = (elementId, todos = []) => {

    //TODO: REFERENCIA
        const element = document.querySelector( elementId ) ;

        todos.forEach( todo => {
            element.append(createTodoHtml(todo))
            
        });

}