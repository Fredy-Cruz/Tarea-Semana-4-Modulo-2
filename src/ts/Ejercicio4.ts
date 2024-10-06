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
import '../css/Ejercicio4.css'

//Inyeccion de HTML para el formulario
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
const resultDiv = document.getElementById("result")!;
const transactionsDiv = document.getElementById("transactions");

//Creacion de clase Cuenta
class Cuenta{
    //Atributos
    private nombre:string;
    private cantidad:number;
    private tipo_de_cuenta:string;
    private numero_de_cuenta:number;

    //Constructor
    constructor(nom:string, cant:number,tipo:string, num:number){
        this.nombre = nom;
        this.cantidad = cant;
        this.tipo_de_cuenta = tipo;
        this.numero_de_cuenta = num;
    }

    //Metodos depositar y retirarar
    public depositar(deposito:number){
        if(deposito < 5.00){
            alert('La cantidad a depositar debe ser de $5.00 o mayor');
        }
        else if(deposito > 10000.00){
            alert('No puede exceder los $10,000.00 por deposito');
        }
        else{
            this.cantidad += deposito;
            alert( `Deposito por $${deposito} realizado con exito`);
        }
    }

    public retirar(retiro:number){
        if(retiro < 5.00){
            alert("Solo puede realizar retiros de $5.00 o mas")
        }
        else if(retiro > this.cantidad){
            alert("No cuenta con esa cantidad de saldo")
        }else{
            this.cantidad -= retiro;
            alert( `Retiro de $${retiro} realizado con exito`);
        }
    }

    public mostrarDatos(){
        resultDiv.innerHTML = `
            <h2>Cuenta ${this.numero_de_cuenta}</h2>
            <p><strong>Nombre:</strong> ${this.nombre}</p>
            <p><strong>Tipo:</strong> ${this.tipo_de_cuenta}</p>
            <p><strong>Saldo:</strong> ${this.cantidad}</p>
        `;
    }
}

//Funcion de numero aleatorio para asignar a la cuenta
function ranNum(): number {
    return Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;
}

//Funcion para activar botones de transacciones
function transactions():void{
    if(resultDiv.innerHTML !== ""){
        transactionsDiv!.innerHTML=`
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
    }


}

//Esquema de validacion para crear cuenta con yup
const cuentaSchema = Yup.object().shape({
    nombre: Yup.string().required().min(2),
    cantidad: Yup.string().required().matches(/^\d+(\.\d{1,2})?$/),
    tipoCuenta: Yup.string().oneOf(['Ahorro', 'Corriente']).required()  
});

//Esquema de validacion para transacciones
const transaccionSchema = Yup.object().shape({
    monto: Yup.string().required().matches(/^\d+(\.\d{1,2})?$/) 
});

//Evento submit del form
document.getElementById("form")!.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nombre = (document.getElementById("nombre") as HTMLInputElement).value;
    const cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    const tipoCuenta = (document.getElementById("tipoCuenta") as HTMLSelectElement).value;

    try {
        // Validar los datos del formulario con el esquema de Yup
        await cuentaSchema.validate({ nombre, cantidad, tipoCuenta});

        const nuevaCuenta = new Cuenta(nombre, parseFloat(cantidad), tipoCuenta, ranNum());

        nuevaCuenta.mostrarDatos();
        (document.getElementById("form") as HTMLFormElement).reset();

        transactions();
      
        //Evento de submit para las transacciones
        document.getElementById("form-trans")!.addEventListener('submit', (e)=>{
            e.preventDefault();
            const radio = document.getElementsByName("transaction");
            const monto = (document.getElementById("monto") as HTMLInputElement).value;
            
            try{
                //Validacion de monto a traves del esquema yup
                console.log(transaccionSchema.validate(monto))
                transaccionSchema.validate(monto);
                
                radio.forEach((option) => {
                    const op = option as HTMLInputElement;
                    if(op.checked){
                        if(op.value === "depositar"){
                            nuevaCuenta.depositar(parseFloat(monto));
                        }else{
                            nuevaCuenta.retirar(parseFloat(monto));
                        }
                    }
                });
                (document.getElementById("form-trans") as HTMLFormElement).reset();
                nuevaCuenta.mostrarDatos();
            }catch(error){
                alert("Tiene que ingresar un dato valido para el monto");
            }
        })
        

    } catch (error) {
        // Mostrar mensaje de error si la validación falla
        alert("Corrobore los datos ingresados");
    }
});


