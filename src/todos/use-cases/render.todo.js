//el elemento del html dodnde se van a renderizar los elementos y los todos son los parametros que recibe la funcion

import { createTodoHtml } from "./create-todo-html.js";

let element = null;

/**
 * 
 * @param {String} elementoId 
 * @param {Todo} todos 
 */

export const renderTodos = (elementId, todos = []) => {

    if(!element) element = document.querySelector(elementId);

    if(!element) throw new Error (`Element ${elementId} not found`);

    element.innerHTML = '';


        todos.forEach( todo => {
            element.append(createTodoHtml(todo))
            
        });

}