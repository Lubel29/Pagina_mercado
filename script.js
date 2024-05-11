/*bienvenida*/
// let bienvenida = prompt("Hola, bienvenido a MarketPrime. ¿Cual es tu nombre?");
// alert(`Hola ${bienvenida}, bienvenido a MarketPrime. Espero disfrutes de nuestros precios bajos`);

// /*Prompt deseas comprar*/
// let seleccion = prompt("¿Deseas comprar?");

// while (seleccion != "si" && seleccion != "no") {
//     alert("Por favor, ingresa 'si' o 'no' en minusculas");
//     seleccion = prompt("¿Deseas comprar?");
// }
// if (seleccion == "si") {
//     alert("Genial! al generar el codigo de descuento, tenés un 10% de descuento en tu compra");
// } else if (seleccion == "no") {
//     alert(`Te invito a navegar por nuestra pagina, ${bienvenida}, para comprar seleccionar un producto del carrito.`);
// };

/*---------------------------------------*/


/*Productos*/
let productos = [
    { nombre: "Pan de salvado", precio: 1800, stock: 50 },
    { nombre: "Manzana", precio: 1500, stock: 80 },
    { nombre: "Naranja", precio: 1800, stock: 100 },
    { nombre: "Arandanos", precio: 2000, stock: 8 },
    { nombre: "Jugo de frutas", precio: 2500, stock: 25 },
    { nombre: "Granola", precio: 2800, stock: 0 },
    { nombre: "Banana", precio: 1600, stock: 50 },
    { nombre: "Frutilla", precio: 2600, stock: 70 },
];


/*Funcion carrito*/

document.addEventListener('DOMContentLoaded', function () {
    const botonesAgregar = document.querySelectorAll('.btn-primary');
    const carrito = document.getElementById('productos-en-carrito');
    const totalCarritoElement = document.getElementById('precio-total');
    let totalCarrito = 0;

    function agregarAlCarrito(nombre, precio, cantidad) {
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('list-group-item');
        nuevoItem.innerHTML = `
            <p>${nombre}</p>
            <span>Cantidad: ${cantidad}</span>
            <span>Precio por unidad / por kg: $${precio.toFixed(2)}</span>
            <i class="bi bi-trash"></i>`
            ;
        carrito.appendChild(nuevoItem);

        totalCarrito += precio * cantidad;
        totalCarritoElement.textContent = `Total : $${totalCarrito.toFixed(2)}`;

        //

        // Event listener para el ícono de la papelera (trash)
        nuevoItem.querySelector('.bi-trash').addEventListener('click', function () {
            totalCarrito -= precio * cantidad;
            totalCarritoElement.textContent = `$${totalCarrito.toFixed(2)}`;
            nuevoItem.remove();
        });
    };

    // Event listener agregar productos al carrito

    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', function () {
            const item = boton.closest('.item');
            const nombre = item.querySelector('.nombre').textContent;
            const precio = parseFloat(item.querySelector('.precio').textContent.slice(1));
            const cantidad = parseInt(item.querySelector('.cantidad').value);
            agregarAlCarrito(nombre, precio, cantidad);
        });
    });

    // Event listener para el botón "Pagar"
    document.querySelectorAll(".css-button-gradient").forEach((boton) => {
        boton.addEventListener("click", () => {
            alert("Tu pedido ha sido procesado con éxito.");
            console.log("se hizo click en pagar");
        });
    });

    //refrescar el carrito al hacer click en comprar
    document.querySelector(".css-button-gradient").addEventListener("click", () => {
        location.reload();
    });

});


//Buscador de productos-Resaltar

document.addEventListener('DOMContentLoaded', function () {
    const formularioBusqueda = document.querySelector('.form-inline');
    const campoBusqueda = formularioBusqueda.querySelector('.form-control');
    const productos = document.querySelectorAll('.item');

  
    function buscarProducto(event) {
        event.preventDefault(); 

        const terminoBusqueda = campoBusqueda.value.toLowerCase();

       
        productos.forEach(producto => {
            const nombreProducto = producto.querySelector('.nombre').textContent.toLowerCase();
            
            
            if (nombreProducto.includes(terminoBusqueda)) {
                producto.classList.add('resaltado');
            } else {
                producto.classList.remove('resaltado');
            }
        });
    }

    formularioBusqueda.addEventListener('submit', buscarProducto);
});









/*---------------------------------------*/


/*Funcion generar codigo Descuento*/

function generarCodigoDescuento() {
    return Math.floor(Math.random() * 10000);
}

let porcentajeDescuento = 10;
let codigoDescuento = generarCodigoDescuento();

console.log("Porcentaje de descuento:", porcentajeDescuento + "%");
console.log("Código de descuento generado:", codigoDescuento);





/*---------------------------------------*/





/*Consultar si hay productos sin stock*/

const productosSinStock = productos.map(producto => producto.stock === 0);
console.log("Productos sin stock:", productosSinStock);

/*Me devolverá TRUE el que el stock sea 0*/





/*---------------------------------------*/




/*Contacto*/

let nombre, email, telefono, mensaje;

document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('formContact');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let nombre = document.getElementById('name').value;
        let email = document.getElementById('email').value;
        let telefono = document.getElementById('phone').value;
        let mensaje = document.getElementById('message').value;

        console.log("Enviando datos al servidor:", nombre, email, telefono, mensaje);

        document.getElementById('respuesta-envio').innerHTML = "<strong>Gracias por contactarnos, " + nombre + "!</strong><br>Hemos recibido tu mensaje";

        // Resetear el formulario
        form.reset();

    });
});
