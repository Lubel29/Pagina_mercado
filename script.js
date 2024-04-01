document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.querySelector('.bi bi-cart3');
    
    const cartContent = document.querySelector('.cart-content');
    
    const cartList = document.getElementById('cart-list');
    
    const totalPriceElement = document.getElementById('total-price');


    const selectedProducts = [];

    console.log(cartIcon)

    function calcularTotal() {
        let total = 0;
        selectedProducts.forEach(product => {
            total += product.price;
        });
        return total;
    }

    
    function actualizarLista() {
        
        cartList.innerHTML = '';

        selectedProducts.forEach(product => {
            const listItem = document.createElement('li');
            listItem.textContent = `${product.title} - $${product.price.toFixed(2)}`;
            cartList.appendChild(listItem);
        });

        
        totalPriceElement.textContent = `Total de la compra: $${calcularTotal().toFixed(2)}`;
    }

   
    const addToCartButtons = document.querySelectorAll('.btn-outline-danger');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const title = button.parentElement.querySelector('.titulo-item').textContent;
            const priceString = button.parentElement.querySelector('.precio-item').textContent.replace('$', '');
            const price = parseFloat(priceString) || 0; // Convertir el precio a número, o 0 si no se puede convertir
            selectedProducts.push({ title, price });
            actualizarLista();
        });
    });

})
