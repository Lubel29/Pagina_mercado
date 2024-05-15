/*---------------------------------------*/

//Bienvenida 

document.addEventListener('DOMContentLoaded', () => {
    Swal.fire({
        title: 'Ingrese su nombre',
        input: 'text',
        customClass: {
            validationMessage: 'my-validation-message',
        },
        inputValidator: (value) => {
            if (!value) {
                return '<i class="fa fa-info-circle"></i> Your name is required';
            }
        },
        preConfirm: (value) => {
            if (value) {
                // Almacenar el nombre del usuario
                localStorage.setItem('user', value);

                // Mostrar cartel de bienvenida
                Swal.fire({
                    title: 'Bienvenido',
                    text: `Bienvenido ${value} a MarketPrime, disfruta tu compra`,
                    icon: 'success'
                }).then(() => {
                    // Actualizar el mensaje en el DOM después de mostrar el cartel
                    const bienvenida = document.getElementById('bienvenida');
                    bienvenida.textContent = `Bienvenid@ ${value}`;
                });
            }
        }
    });
});



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

console.log(productos);

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
        totalCarritoElement.textContent = `Total : $${totalCarrito.toFixed(2)}`


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

            // Verificar stock y agregar al carrito
            const productoSeleccionado = productos.find(producto => producto.nombre === nombre);
            productoSeleccionado && productoSeleccionado.stock >= cantidad ? (
                agregarAlCarrito(nombre, precio, cantidad),
                productoSeleccionado.stock -= cantidad
            ) : (
                productoSeleccionado ? alert('El producto no está disponible') : alert('El producto no cuenta con stock')
            );

            //refrescar el carrito al hacer click en comprar
            document.querySelector(".css-button-gradient").addEventListener("click", () => {
                location.reload();
            });
        });
    });


    // Event listener para el botón "Pagar"
    document.querySelectorAll(".css-button-gradient").forEach((boton) => {
        boton.addEventListener("click", () => {
            alert("Tu pedido ha sido procesado con éxito.");
            console.log("se hizo click en pagar");
        });
    });

    // Event listener para el botón de descuento
    let descuentoAplicado = false;
    const aplicarDescuentoButton = document.getElementById("aplicarDescuentoButton");
    const codigoDescuentoInput = document.getElementById("code");
    // Agrega un event listener para el evento de clic en el botón
    aplicarDescuentoButton.addEventListener("click", () => {
        // Obtén el valor del campo de entrada del código de descuento
        const codigoDescuento = codigoDescuentoInput.value.trim();

        // Verifica si el descuento ya ha sido aplicado
        if (descuentoAplicado) {
            alert("El código de descuento ya ha sido aplicado.");
        } else {
            // Verifica si el código de descuento ingresado es válido
            if (codigoDescuento === "MARKET10") {
                // Calcula el descuento del 10% y actualiza el total del carrito
                totalCarrito -= totalCarrito * 0.1;

                // Actualiza el elemento que muestra el total del carrito
                totalCarritoElement.textContent = totalCarrito.toFixed(2);

                // Marca que el descuento ha sido aplicado
                descuentoAplicado = true;

                // Muestra un mensaje de éxito
                alert("Descuento aplicado con éxito.");
            } else {
                // Muestra un mensaje si el código de descuento ingresado no es válido
                alert("El código de descuento ingresado no es válido.");
            }
        }
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
            producto.classList.toggle('resaltado', nombreProducto.includes(terminoBusqueda));
        });
    }
    formularioBusqueda.addEventListener('submit', buscarProducto);
});


//LOGIN


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

        form.reset();

    });
});

