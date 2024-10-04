/* EJERCICIO 1. Crear una clase Cabecera Pagina, que contenga 3 métodos, el primer método que obtenga el título,
color y fuente de la página, el segundo método que indique como desea que aparezca el título si centrado, 
derecha o izquierda y el tercer método que imprima todas las propiedades. */

import '../css/Ejercicio1.css';

// Inyeccion de HTML
const content = document.getElementById('app');
content!.innerHTML = `
  <h1 class="title" id="title">Testing Title...</h1>
  <form id="form">
    <label for="options">How would you like your title?</label>
    <select id="options" name="opciones">
        <option value="left">Left</option>
        <option value="right">Right</option>
        <option value="center">Center</option>
    </select>
    <br><br>
    <button type="submit">Try</button>
  </form>
  <div id="info"></div>
`;

class Cabecera_Pagina {
  // Atributos
  private titleContent: string | null;
  private bodyColor: string | null;
  private bodyFont: string | null;
  private titleAlign: string;

  // Constructor
  constructor() {
    this.titleContent = "";
    this.bodyColor = "";
    this.bodyFont = "";
    this.titleAlign = "left";
  }

  // Metodo para obtener titulo, color y fuente
  public getPageData(): void {
    // Obtener el titulo
    const title = document.getElementById('title');
    if (title) {
      this.titleContent = title.textContent;
    }

    // Obtener el color y fuente de pagina 
    const body = document.querySelector('body');
    if (body) {
      const computedStyle = getComputedStyle(body);
      this.bodyColor = computedStyle.backgroundColor;
      this.bodyFont = computedStyle.fontFamily;
    }

    console.log(this.bodyColor, this.bodyFont, this.titleContent);
  }

  // Metodo para indicar como se desea el titulo
  public setTitleAlign(): void {
    // Evento para boton de formulario
    const form = document.getElementById("form");
    form!.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('title');
      title!.classList.remove(this.titleAlign);
      const align = document.getElementById('options') as HTMLSelectElement;
      this.titleAlign = align.value;

      console.log(this.titleAlign);
      // Asignacion de clase a title
      title!.classList.add(this.titleAlign);

      // Actualizar la información mostrada
      this.getObjectData();
    });
  }

  // Metodo para imprimir todas las propiedades
  public getObjectData(): void {
    const info = document.getElementById('info');
    info!.innerHTML = `
      <p>Title text: ${this.titleContent}</p>
      <p>Color of the page: ${this.bodyColor}</p>
      <p>Font of the page: ${this.bodyFont}</p>
      <p>Title alignment: ${this.titleAlign}</p>
    `;
  }
}

// Creacion de objeto
const prueba = new Cabecera_Pagina();
prueba.getPageData();
prueba.setTitleAlign();
prueba.getObjectData();
