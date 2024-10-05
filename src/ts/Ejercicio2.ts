// Import de CSS
import '../css/Ejercicio2.css';
// Importar Yup
import * as Yup from 'yup';

// Creación de clase Calculadora
class Calculadora {
    public sumar(a: number, b: number): number {
        return a + b;
    }

    public restar(a: number, b: number): number {
        return a - b;
    }

    public multiplicar(a: number, b: number): number {
        return a * b;
    }

    public dividir(a: number, b: number): number {
        return b === 0 ? NaN : a / b;
    }

    public potencia(a: number, b: number): number {
        return Math.pow(a, b);
    }

    public factorial(a: number): number {
        if (a < 0 || !Number.isInteger(a)) return NaN;
        return a === 0 ? 1 : Array.from({ length: a }, (_, i) => i + 1).reduce((acc, val) => acc * val, 1);
    }
}

// Creación de esquema de validación
const schema = Yup.object().shape({
    a: Yup.string()
        .required('El primer número es requerido')
        .test('is-valid-number', 'Debes introducir un número válido', value => !value || !isNaN(Number(value))),
    b: Yup.string()
        .nullable()
        .test('is-valid-number', 'Debes introducir un número válido', value => value === null || value === '' || !isNaN(Number(value))),
});

// Instancia de clase
const calculator1 = new Calculadora();

// Inyección de HTML
const container = document.getElementById('app');
container!.innerHTML = `
    <h1 class="title">Calculator<h1>
    <form id="form" class="form">
        <div id="selection" class="div">
            <select id="options">
                <option value="addition">Addition</option>
                <option value="subtraction">Subtraction</option>
                <option value="multiplication">Multiplication</option>
                <option value="division">Division</option>
                <option value="power">Power</option>
                <option value="factorial">Factorial</option>
            </select>
        </div>
        <div id="textboxes" class="div">
            <input type="text" id="a" required>
            <p id="symbol" class="symbol">+</p>
            <input type="text" id="b">
        </div>
        <button type="submit" class="button">=</button>
        <div id="operation-result" class="div">
            <input type="text" id="result" readonly>
        </div>
    </form>
`;

// Constantes para DOM
const selector = document.getElementById('options') as HTMLSelectElement;
const form = document.getElementById('form');
const txtA = document.getElementById("a") as HTMLInputElement;
const txtB = document.getElementById("b") as HTMLInputElement;
const txtResult = document.getElementById("result") as HTMLInputElement;
const symbolLabel = document.getElementById("symbol");

// Función para actualizar el símbolo y la visibilidad de txtB
const updateSymbolAndVisibility = () => {
    const operation = selector.value;
    const symbols: { [key: string]: string } = {
        addition: "+",
        subtraction: "-",
        multiplication: "*",
        division: "/",
        power: "^",
        factorial: "!"
    };

    symbolLabel!.textContent = symbols[operation];
    txtB.classList.toggle('hide', operation === "factorial");
    txtB.classList.toggle('show', operation !== "factorial");
};

// Evento cuando se cambia el valor del selector
selector.addEventListener("change", updateSymbolAndVisibility);

// Evento para el envío de formulario
form!.addEventListener('submit', async (e) => {
    e.preventDefault();

    const operation: string = selector.value;

    try {
        const aValue = txtA.value;
        const bValue = operation === "factorial" ? null : txtB.value;
        await schema.validate({ a: aValue, b: bValue });

        const aNum = Number(aValue);
        const bNum = operation === "factorial" ? null : Number(bValue);
        
        // Llamar a métodos de clase y mostrar resultados
        let result: number | null = null;
        switch (operation) {
            case "addition": result = calculator1.sumar(aNum, bNum!); break;
            case "subtraction": result = calculator1.restar(aNum, bNum!); break;
            case "multiplication": result = calculator1.multiplicar(aNum, bNum!); break;
            case "division": result = calculator1.dividir(aNum, bNum!); break;
            case "power": result = calculator1.potencia(aNum, bNum!); break;
            case "factorial": result = calculator1.factorial(aNum); break;
            default: alert("An error has occurred"); break;
        }

        if (Number.isNaN(result)) {
            alert("Error en la operación");
            txtResult.value = "";
        } else {
            txtResult.value = result!.toString();
        }

    } catch (e) {
        alert("Ha ocurrido un error: ");
    }
});

// Inicializar el símbolo y la visibilidad de txtB al cargar la página
updateSymbolAndVisibility();
