/* EJERCICIO 4. Crea una clase llamada Cuenta y va contener lo siguiente:
Atributos: nombre, cantidad, tipo de cuenta y número de cuenta.
Métodos: 
•	Crear un constructor que reciba como parámetros el nombre, cantidad, tipo de cuenta y número de cuenta.
•	Crea un método llamado depositar y en base a la cantidad ingresada en el constructor haz una condición 
    de que si la cantidad es menor a $5.00 que se imprima un mensaje que el valor a depositar debe ser mayor a $5.00 y
    sino solo imprima un mensaje de que se ha depositado correctamente y la cantidad depositada.
•	Crea un método llamado retirar, que reciba un parámetro llamado valor y en base a eso tienes que restar la cantidad 
    menos el valor ingresado e imprimir un mensaje de lo que ha retirado y cuanto le queda en su cuenta.
Nota: Para el método retirar debes de validar que lo que se retire sea mayor de $5.00 ya que si no hay efectivo debes de 
tirar un mensaje que no hay nada en la cuenta.
•	Crea un método para mostrar los datos de su nombre, tipo de cuenta y número de cuenta. 
•	Define un objeto de la clase Cuenta y llama sus métodos.
 */

import * as Yup from 'yup';
import '../css/Ejercicio4.css';

// Inyección de HTML para el formulario
const container = document.getElementById('app');
container!.innerHTML = `
    <div>
        <h1 class="title">Cuentas de banco</h1>
    </div>
    <div class="content">
        <form id="form" class="content-element">
            <div class="form-element">
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" />
            </div>
            <div class="form-element">
                <label for="cantidad">Cantidad:</label>
                <input type="text" id="cantidad" />
            </div>
            <div class="form-element">
                <label for="tipoCuenta">Tipo de Cuenta:</label>
                <select id="tipoCuenta">
                    <option value="Ahorro">Ahorro</option>
                    <option value="Corriente">Corriente</option>
                </select>
            </div>
            <button type="submit">Crear Cuenta</button>
        </form>
        <div id="result" class="content-element"></div>
        <div id="transactions"></div>
    </div>
`;
const resultDiv = document.getElementById('result')!;
const transactionsDiv = document.getElementById('transactions')!;

//Creación de clase Cuenta
class Cuenta {
    constructor(
        private nombre: string,
        private cantidad: number,
        private tipo_de_cuenta: string,
        private numero_de_cuenta: number
    ) {}

    public depositar(deposito: number) {
        if (deposito < 5.0) {
            alert('La cantidad a depositar debe ser de $5.00 o mayor');
        } else if (deposito > 10000.0) {
            alert('No puede exceder los $10,000.00 por deposito');
        } else {
            this.cantidad += deposito;
            alert(`Deposito por $${deposito} realizado con exito`);
        }
    }

    public retirar(retiro: number) {
        if (retiro < 5.0) {
            alert('Solo puede realizar retiros de $5.00 o mas');
        } else if (retiro > this.cantidad) {
            alert('No cuenta con esa cantidad de saldo');
        } else {
            this.cantidad -= retiro;
            alert(`Retiro de $${retiro} realizado con exito`);
        }
    }

    public mostrarDatos() {
        resultDiv.innerHTML = `
            <h2>Cuenta ${this.numero_de_cuenta}</h2>
            <p><strong>Nombre:</strong> ${this.nombre}</p>
            <p><strong>Tipo:</strong> ${this.tipo_de_cuenta}</p>
            <p><strong>Saldo:</strong> ${this.cantidad}</p>
        `;
    }
}

// Generar número de cuenta aleatorio
const ranNum = (): number => Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

// Esquema de validación para crear cuenta con yup
const cuentaSchema = Yup.object().shape({
    nombre: Yup.string().required().min(2),
    cantidad: Yup.string().required().matches(/^\d+(\.\d{1,2})?$/),
    tipoCuenta: Yup.string().oneOf(['Ahorro', 'Corriente']).required(),
});

// Esquema de validación para transacciones
const transaccionSchema = Yup.object().shape({
    monto: Yup.string().required().matches(/^\d+(\.\d{1,2})?$/),
});

// Función para mostrar formulario de transacciones
const mostrarFormularioTransacciones = () => {
    transactionsDiv.innerHTML = `
        <h2>Transacciones</h2>
        <form id="form-trans">
            <input type="radio" name="transaction" value="depositar" checked/>
            <label for="depositar">Deposito de efectivo</label><br>
            <input type="radio" name="transaction" value="retirar"/>
            <label for="retirar">Retiro de efectivo</label><br>
            <input type="text" id="monto"/>
            <button type="submit">Confirmar</button>
        </form>
    `;
    agregarEventoTransaccion();
};

// Agregar evento de transacciones
const agregarEventoTransaccion = () => {
    document.getElementById('form-trans')!.addEventListener('submit', async (e) => {
        e.preventDefault();

        const monto = (document.getElementById('monto') as HTMLInputElement).value;
        const radio = document.querySelector('input[name="transaction"]:checked') as HTMLInputElement;

        try {
            await transaccionSchema.validate({ monto });
            if (radio.value === 'depositar') {
                nuevaCuenta.depositar(parseFloat(monto));
            } else {
                nuevaCuenta.retirar(parseFloat(monto));
            }
            (document.getElementById('form-trans') as HTMLFormElement).reset();
            nuevaCuenta.mostrarDatos();
        } catch (error) {
            alert('Tiene que ingresar un dato valido para el monto');
        }
    });
};

// Evento submit del formulario principal
let nuevaCuenta: Cuenta;
document.getElementById('form')!.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = (document.getElementById('nombre') as HTMLInputElement).value;
    const cantidad = (document.getElementById('cantidad') as HTMLInputElement).value;
    const tipoCuenta = (document.getElementById('tipoCuenta') as HTMLSelectElement).value;

    try {
        await cuentaSchema.validate({ nombre, cantidad, tipoCuenta });

        nuevaCuenta = new Cuenta(nombre, parseFloat(cantidad), tipoCuenta, ranNum());
        nuevaCuenta.mostrarDatos();
        (document.getElementById('form') as HTMLFormElement).reset();

        mostrarFormularioTransacciones();
    } catch (error) {
        alert('Corrobore los datos ingresados');
    }
});

