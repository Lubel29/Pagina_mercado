
/*bienvenida*/
let bienvenida = prompt("Hola, bienvenido a MarketPrime. ¿Cual es tu nombre?");
alert(`Hola ${bienvenida}, bienvenido a MarketPrime. Espero disfrutes de nuestros precios bajos`);

/*Prompt deseas comprar*/
let seleccion = prompt("¿Deseas comprar?");

while (seleccion != "si" && seleccion != "no") {
    alert("Por favor, ingresa 'si' o 'no' en minusculas");
    seleccion = prompt("¿Deseas comprar?");
}
if (seleccion == "si") {
    alert("Genial, elige un producto");
} else if (seleccion == "no") {
    alert(`Te esperamos pronto!, ${bienvenida}`);
};

/*carrito*/
let carrito = [];
let productos = [
    { nombre: "Pan de salvado", precio: 1800 },
    { nombre: "Manzana x kg", precio: 1500 },
    { nombre: "Naranja x kg", precio: 1800 },
    { nombre: "Arandanos x gr", precio: 2000 },
    { nombre: "jugo de frutas", precio: 2500 },
    { nombre: "Granola x kg", precio: 0 },
    { nombre: "banana x kg", precio: 1600 },
    { nombre: "Frutilla x kg", precio: 2600 },
];

/*Stock*/
function Stock() {
    alert("No hay stock de " + productos[5].nombre); 
}

let productoSinStock = new Stock();