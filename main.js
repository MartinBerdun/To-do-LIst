import './style.css'
import { App } from './src/todos/app.js';
import todoStore from './src/store/todo.store';
//importo todo lo que esta en el archivo todo.store con el nombre de todoStore


todoStore.initStore();

App('#app')




