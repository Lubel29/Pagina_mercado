/*---------------------------------------*/

// //Bienvenida 
document.addEventListener('DOMContentLoaded', function () {
    const usuarioGuardado = localStorage.getItem('usuario');

    if (usuarioGuardado) {
        mostrarMensajeBienvenida(usuarioGuardado);
    } else {
        mostrarFormularioLogin();
    }
});

function mostrarFormularioLogin() {
    Swal.fire({
        title: 'Iniciar Sesión',
        html: `
            <input type="text" id="login" class="swal2-input" placeholder="Usuario">
            <input type="password" id="password" class="swal2-input" placeholder="Contraseña">
        `,
        confirmButtonText: 'Iniciar Sesión',
        focusConfirm: false,
        preConfirm: () => {
            const login = Swal.getPopup().querySelector('#login').value;
            const password = Swal.getPopup().querySelector('#password').value;
            if (!login || !password) {
                Swal.showValidationMessage(`Por favor ingrese usuario y contraseña`);
            }
            return { login: login, password: password };
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const { login } = result.value;
            localStorage.setItem('usuario', login);
            mostrarMensajeBienvenida(login);
        }
    });
}

function mostrarMensajeBienvenida(usuario) {
    Swal.fire({
        title: 'Bienvenido',
        text: `Bienvenido ${usuario} a MarketPrime, disfruta tu compra`,
        icon: 'success'
    }).then(() => {
        const bienvenida = document.getElementById('bienvenida');
        bienvenida.textContent = `Bienvenid@ ${usuario}`;
    });
};





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

    // Obtener carrito de localStorage al cargar la página
    let carritoLocalStorage = localStorage.getItem('carrito');
    let carritoActual = carritoLocalStorage ? JSON.parse(carritoLocalStorage) : [];

    // Función para actualizar el carrito en localStorage
    function actualizarCarritoLocalStorage() {
        localStorage.setItem('carrito', JSON.stringify(carritoActual));
    }

    // Función para agregar un producto al carrito
    function agregarAlCarrito(nombre, precio, cantidad) {
        const nuevoItem = document.createElement('li');
        nuevoItem.classList.add('list-group-item');
        nuevoItem.innerHTML = `
            <p>${nombre}</p>
            <span>Cantidad: ${cantidad}</span>
            <hr>
            <span>Precio por unidad / por kg: $${precio.toFixed(2)}</span>
            <i class="bi bi-trash"></i>`
            ;
        carrito.appendChild(nuevoItem);

        totalCarrito += precio * cantidad;
        totalCarritoElement.textContent = `Total : $${totalCarrito.toFixed(2)}`

        // Agregar producto al carrito actual y actualizar localStorage
        carritoActual.push({ nombre, precio, cantidad });
        actualizarCarritoLocalStorage();


        // Event listener para el ícono de la papelera (trash)
        nuevoItem.querySelector('.bi-trash').addEventListener('click', function () {
            totalCarrito -= precio * cantidad;
            totalCarritoElement.textContent = `$${totalCarrito.toFixed(2)}`;
            nuevoItem.remove();
        });

        // Remover producto del carrito actual y actualizar localStorage
        carritoActual = nuevoItem.filter(item => item.nombre !== nombre);
        actualizarCarritoLocalStorage();
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
        });
    });


    // Event listener para el botón "Pagar"
    const botonComprar = document.querySelector(".css-button-gradient");
    botonComprar.addEventListener("click", (event) => {
        event.preventDefault();

        Swal.fire({
            title: '¿Quieres comprar este producto? Ingresa tu dirección de envío',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, comprar',
            cancelButtonText: 'Cancelar',
            input: 'text',
            inputPlaceholder: 'Ingresa tu dirección',
            inputValidator: (value) => {
                if (!value) {
                    return 'Por favor, ingresa tu dirección';
                }
            },
            persistent: true
        }).then((result) => {
            if (result.isConfirmed) {
                const direccion = result.value;
                console.log('Compra confirmada');
                console.log('Dirección de envío:', direccion);
                Swal.fire('¡Gracias por tu compra!', `En los proximos dias recibiras tu pedido en ${direccion}`, 'success');
                enviarDireccionAlServidor(direccion);
                // Guardar el carrito en localStorage
                localStorage.setItem('carrito', JSON.stringify(carritoActual));
            } else {
                console.log('Compra cancelada');
                Swal.fire('Compra cancelada', 'No se ha enviado el formulario', 'error');
            }
        });
    });

    //almacenar en local storage direccion
    function enviarDireccionAlServidor(direccion) {
        localStorage.setItem('direccion', direccion);
    };


    // Event listener para el botón de descuento
    let descuentoAplicado = false;
    const aplicarDescuentoButton = document.getElementById("aplicarDescuentoButton");
    const codigoDescuentoInput = document.getElementById("code");
    aplicarDescuentoButton.addEventListener("click", () => {
        const codigoDescuento = codigoDescuentoInput.value.trim();
        if (descuentoAplicado) {
            alert("El código de descuento ya ha sido aplicado.");
        } else {
            if (codigoDescuento === "MARKET10") {
                totalCarrito -= totalCarrito * 0.1;
                totalCarritoElement.textContent = `$${totalCarrito.toFixed(2)}`;
                descuentoAplicado = true;
                alert("Descuento aplicado con éxito.");
            } else {
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
            const coincide = nombreProducto.includes(terminoBusqueda);
            producto.classList.toggle('resaltado', coincide);

            if (coincide) {
                producto.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    formularioBusqueda.addEventListener('submit', buscarProducto);
});



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

