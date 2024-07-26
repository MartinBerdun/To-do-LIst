//para ejecutar el programa debo correr npm run dev
//para estos casos no es recomendable usar live server ya que Vite viene con las herramientas necesarias para correr el servidor local.
import {renderTodos, renderPending} from './use-cases'
import todoStore, { Filters } from '../store/todo.store'
import html from './app.html?raw'
//se pone el raw porque vite espera que se importe algo de js pero como no lo es tira error entonces eso es para que lo importe asi nomas sin error


const ElementIds = {
    TodoList : ".todo-list",
    newTodoImput : '#new-todo-input',
    destroyTodo : '.destroy',
    ClearCompleted : '.clear-completed',
    TodoFilters : '.filtro',
    PendingCount : '#pending-count',


}

/**        
 * 
 * @param {String} elementId 
 */

//va a crear lo que queremos renderizar en pantalla
//el elementId es el elemento en donde voy a renderizar la aplicacion
export const App = (elementId) => {

    const displayTodos = () => {
        
        const todos = todoStore.getTodos( todoStore.getCurrentFilter());
        
        renderTodos(ElementIds.TodoList, todos)
        updatePendingCount()
    }

    //Voy a llamar esta funcion donde yo se que hay posibles cambios
    const updatePendingCount = () => {
        renderPending(ElementIds.PendingCount);
    }

    //cuando la funcion App() se llama
    //funcion anonima autoinvocada 
    //La función anónima autoinvocada se utiliza en este caso para ejecutar código inmediatamente después de que se llama a la función App(). Esto es útil cuando necesitas que ciertas acciones, como la creación de la aplicación, se realicen tan pronto como se llama a la función. Esto es porque más adelante se colocará más código dentro de la función App y necesitamos que lo que está dentro de la función anónima autoinvocada se haga antes que lo demás.

    (()=> {
        //La principal diferencia entre crear un elemento div, hacer el innerHTML y luego el append, y hacer un innerHTML directo en el div, radica en cómo se maneja el contenido existente.Cuando usas innerHTML, estás reemplazando todo el contenido HTML dentro del elemento seleccionado. Por lo tanto, si ya había contenido en el elemento, se perderá. Por otro lado, cuando creas un nuevo elemento div, estableces su innerHTML y luego lo agregas al elemento existente con append, estás añadiendo el nuevo contenido al final del contenido existente, sin eliminar nada de lo que ya estaba allí.Por lo tanto, si quieres preservar el contenido existente y simplemente agregar algo nuevo al final, deberías usar el método append. Si quieres reemplazar completamente el contenido existente, puedes usar innerHTML.
        
        const app = document.createElement( 'div' );
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
        displayTodos();
    })();

    
    
    
    //referencias html

    const newDescriptionInput = document.querySelector(ElementIds.newTodoImput);

    const todoListUl = document.querySelector(ElementIds.TodoList);

    const ClearCompletedButton = document.querySelector(ElementIds.ClearCompleted);

    const filtersLis = document.querySelectorAll(ElementIds.TodoFilters);




    /////////////////////////////////7LISTENERS/////////////////////////////
    //el keyup es para cuando se apreta un atecla y se la suelta
    newDescriptionInput.addEventListener('keyup', (event) => {

        /* console.log(event.target.value); */ //captura lo que uno escribe 

        //tecla enter
        if(event.keyCode !== 13) return; //cualquier tecla que yo presione va a sacarme de aqui, no continua la ejecucion.. si yo apreto enter entones hace el resto del codigo que vendria ser el sumar el todo

        //el trim quita lso espacios de mas tanto adelante como atras
        if(event.target.value.trim().length === 0) return;//no hace nada si no hay ninguna letra

        todoStore.addTodo(event.target.value)//el texto que esta en la caja
        displayTodos();
        event.target.value = ''; //para que no se duplique, despues de haberlo insertado que se limpie.
    })

    todoListUl.addEventListener('click', (event)=>{
        //busca el elemento html que tenga el data-is mas cercano hacia el padre
        const element = event.target.closest('[data-id]');
        //saca el id para saber cual tachar
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodos();
    })

    todoListUl.addEventListener('click', (event)=>{
        //agarro solo el elemento que tenga ese nombre de clase
        const isDestroyedElement = event.target.className === 'destroy'; 
        const element = event.target.closest('[data-id]');
        
        if (!element || !isDestroyedElement) return;

        todoStore.deleteTodo(element.getAttribute('data-id'));
        displayTodos();
    })


    ClearCompletedButton.addEventListener('click', ()=> {
        todoStore.deleteCompleted();
        displayTodos();
    })

    filtersLis.forEach( element => {
        
        element.addEventListener('click', (element)=>{
            filtersLis.forEach(el =>el.classList.remove('selected'))
            element.target.classList.add('selected');

            switch(element.target.text){
                case 'Todos':
                    todoStore.setFilter(Filters.All)
                break;
                case 'Pendientes':
                    todoStore.setFilter(Filters.Pending)
                break;
                case 'Completados':
                    todoStore.setFilter(Filters.Completed)
                break;
            }

            displayTodos();

        })
    })







}