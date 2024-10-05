/* EJERCICIO 3. Crea una clase llamada Canción:
Atributos: título, género de la canción y un atributo privado que se llame autor.
Métodos: 
•	Crear un constructor que reciba como parámetros el título y género de la canción.
•	Utiliza los métodos get y set para recibir e imprimir la propiedad autor. 
•	Crea un método para mostrar los datos de la canción. 
*/

import '../css/Ejercicio3.css'

//Constantes para manejo de DOM
const container = document.getElementById('app');
const dataContainer = document.createElement('div');

//Para dar estilo
dataContainer!.classList.add('data');

container!.innerHTML = `
    <h1 class="title">Canciones</h1>
    <form id="form">
        <label for="autor">Autor:</label>
        <input type="text" name="autor" id="autor">
        <button type="submit" id="btn">Guardar</button>
    </form>
`;

//Creacion de clase Cancion
class Cancion{
    titulo: string;
    genero: string;
    private autor:string;

    constructor(titulo:string, genero:string){
        this.titulo = titulo;
        this.genero = genero;
        this.autor = "";
    }

    public getAutor():string{
        return this.autor
    }

    public setAutor(autor:string):void{
        this.autor = autor;
    }

    //Pintar la informacion con DOM
    public getData():void{
        dataContainer.innerHTML = `
            <h3>Datos de la Canción</h3>
            <p><strong>Título:</strong> ${this.titulo}</p>
            <p><strong>Género:</strong> ${this.genero}</p>
            <p><strong>Autor:</strong> ${this.autor}</p>
        `;

        container!.appendChild(dataContainer);
    }
}

//Instancia de clase
const cancion1 = new Cancion("Sonic Youth", "Rock");

const form = document.getElementById('form');
const autor = document.getElementById('autor') as HTMLInputElement;

//Evento submit para formulario con el autor
form!.addEventListener('submit', (e)=>{
    e.preventDefault();
    if(autor.value.trim() === ""){
        alert("Debe llenar el campo");
    }
    else{
        cancion1.setAutor(autor.value);
        cancion1.getData();
    }
})

