/* EJERCICIO 5. Crear una clase abstracta Persona y va contener lo siguiente:
Atributos: nombre, apellido, dirección, teléfono y edad.
Métodos: 
•	Crear un método constructor para recibir los datos.
•	Crea un método que en base a la edad imprima un mensaje si es mayor de edad o no.
•	Crea un método para mostrar todos los datos personales (será el método abstracto).
•	Crea una clase extra llamada Empleado y va contener un atributo llamado sueldo.
•	En la clase Empleado añade los métodos cargar sueldo e imprimir sueldo.
•	La clase Empleado va heredar de la clase Persona.
•	Define un objeto de la clase Empleado y que se imprima los datos del empleado y su sueldo.

*/

import '../css/Ejercicio5.css'

//Inyeccion de HTML
const container = document.getElementById('app');
container!.innerHTML=`
    <h1 class="title">Empleados</h1>
    <div id="datos" class="div"></div>
    <div id="sueldo" class="div"></div>
`;

const datosDiv = document.getElementById('datos');
const sueldoDiv = document.getElementById('sueldo');
// Clase abstracta Persona
abstract class Persona {
    protected nombre: string;
    protected apellido: string;
    protected direccion: string;
    protected telefono: string;
    protected edad: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.telefono = telefono;
        this.edad = edad;
    }

    public verificarMayorEdad(): string {
        if (this.edad >= 18) {
            return `Es mayor de edad.`;
        } else {
            return `Es menor de edad.`;
        }
    }

    // Método abstracto para mostrar los datos personales
    abstract mostrarDatosPersonales(): void;
}

//Creacion de Clase Empleado
class Empleado extends Persona {
    private sueldo: number;

    constructor(nombre: string, apellido: string, direccion: string, telefono: string, edad: number, sueldo: number) {
        super(nombre, apellido, direccion, telefono, edad);
        this.sueldo = sueldo;
    }

    public cargarSueldo(sueldo: number): void {
        this.sueldo = sueldo;
    }

    public imprimirSueldo(): void{
        sueldoDiv!.innerHTML =`
            <h2>Sueldo</h2>
            <p><strong>Sueldo del empleado: </strong>$${this.sueldo}</p>

        `;
    }

    //Mostrar los datos personales
    public mostrarDatosPersonales(): void {
        datosDiv!.innerHTML += `
            <h2>Datos personales de ${this.nombre}</h2>
            <p><strong>Nombre completo: </strong>${this.nombre} ${this.apellido}</p>
            <p><strong>Edad: </strong>${this.edad}</p>
            <p><strong>Direccion: </strong>${this.direccion}</p>
            <p><strong>Telefono: </strong>${this.telefono}</p>
            <p>${this.verificarMayorEdad()}</p>
        `;

    }
}

// Crear un objeto de la clase Empleado y llamar a sus métodos
const empleado = new Empleado("Fredy", "Cruz", "Tangamandapia", "12345678", 19, 2000);

// Mostrar datos del empleado
empleado.mostrarDatosPersonales();
empleado.imprimirSueldo();
