//para ejecutar el programa debo correr npm run dev
//para estos casos no es recomendable usar live server ya que Vite viene con las herramientas necesarias para correr el servidor local.


import html from './app.html?raw'
//se pone el raw porque vite espera que se importe algo de js pero como no lo es tira error entonces eso es para que lo importe asi nomas sin error

/**
 * 
 * @param {String} elementId 
 */

//va a crear lo que queremos renderizar en pantalla
//el elementId es el elemento en donde voy a renderizar la aplicacion
export const App = (elementId) => {

    //cuando la funcion App() se llama
    //funcion anonima autoinvocada 
    //La función anónima autoinvocada se utiliza en este caso para ejecutar código inmediatamente después de que se llama a la función App(). Esto es útil cuando necesitas que ciertas acciones, como la creación de la aplicación, se realicen tan pronto como se llama a la función. Esto es porque más adelante se colocará más código dentro de la función App y necesitamos que lo que está dentro de la función anónima autoinvocada se haga antes que lo demás.
    (()=> {
        //La principal diferencia entre crear un elemento div, hacer el innerHTML y luego el append, y hacer un innerHTML directo en el div, radica en cómo se maneja el contenido existente.Cuando usas innerHTML, estás reemplazando todo el contenido HTML dentro del elemento seleccionado. Por lo tanto, si ya había contenido en el elemento, se perderá. Por otro lado, cuando creas un nuevo elemento div, estableces su innerHTML y luego lo agregas al elemento existente con append, estás añadiendo el nuevo contenido al final del contenido existente, sin eliminar nada de lo que ya estaba allí.Por lo tanto, si quieres preservar el contenido existente y simplemente agregar algo nuevo al final, deberías usar el método append. Si quieres reemplazar completamente el contenido existente, puedes usar innerHTML.




        const app = document.createElement( 'div' );
        app.innerHTML = html;
        document.querySelector(elementId).append( app );
    })();

}