// Almacenamos los productos en el localStorage
const carritoID = 'almacenarEnCarrito';

let cartProducts = [];

function storeLocalCart() {
    if (cartProducts.length > 0) {
        localStorage.setItem(carritoID, JSON.stringify(cartProducts));
    } else {
        localStorage.removeItem(carritoID);
    }
}

function recoverLocalCart() {
    return JSON.parse(localStorage.getItem(carritoID)) || [];
}

function loadCart() {
    cartProducts = recoverLocalCart();
}

function clearCart() {
    cartProducts = []
    storeLocalCart()
    updateCartList()
}

// Agregar un producto al carrito.
function addToCart(productID) {
    productID = parseInt(productID)

    // Buscar el producto en la tienda.
    const storeProduct = storeProducts.find((p) => p.id === productID);

    if (!storeProduct) {
        console.error('Store Product not found: ' + productID)
        return;
    }

    // Buscar el producto en el carrito.
    const cartProduct = cartProducts.find((p) => p.id === productID);

    if (cartProduct) {
        // Si existe, incrementa la cantidad en 1.
        cartProduct.cantidad++;
    } else {
        // Si no existe, crea uno nuevo con cantidad en 1.
        storeProduct.amount = 1;
        cartProducts.push(storeProduct);
    }

    // Guarda el carrito en el almacenamiento local.
    storeLocalCart();

    // Mostrar notificacion
    showNotification();

    // Actualiza la lista del carrito en el DOM.
    updateCartList();
}

// Eliminar el producto del carrito.
function removeFromCart(productID) {
    // Filtra los productos del carrito, eliminando el producto con el ID especificado.
    cartProducts = cartProducts.filter((p) => p.id !== parseInt(productID));

    // Guarda el carrito en el almacenamiento local.
    storeLocalCart();

    // Actualiza la lista del carrito en el DOM.
    updateCartList();
}

// Aumentar cantidad de un producto en el carrito.
function incrementCartQuantity(productID) {
    // Encuentra el producto en el carrito.
    const cartProduct = cartProducts.find((p) => p.id === parseInt(productID));

    if (cartProduct) {
        // Incrementa la cantidad
        cartProduct.amount++;

        // Actualiza la lista del carrito en el DOM
        updateCartList();
    }
};

// Disminuir la cantidad de un producto en el carrito.
function decreaseCartQuantity(productID) {
    // Encuentra el producto en el carrito.
    const cartProduct = cartProducts.find((p) => p.id === parseInt(productID));

    if (cartProduct) {
        // Disminuye la cantidad
        cartProduct.amount -= 1;

        if (cartProduct.amount < 1) {
            // Si la cantidad es menor a 1, elimina el producto del carrito
            removeFromCart(productID);
        }

        // Actualiza la lista del carrito en el DOM
        updateCartList();
    }
};

// Calcular el precio total y subtotal.
function getCartTotal() {
    const subtotalElement = document.querySelector('.subtotal');
    const discountsElement = document.querySelector('.descuentos');
    const shipmentElement = document.querySelector('.envio');
    const totalElement = document.querySelector('.total');

    // Calcular subtotal sumando los precios de todos los productos
    const subtotal = cartProducts.reduce((total, product) => total + (product.price * product.amount), 0);

    // Puedes agregar lógica para calcular descuentos y envío si es necesario
    const discountAmount = 10;
    const shippingCost = 500;

    let total;

    // If subtotal is 0, set total to 0
    if (subtotal === 0) {
        total = 0;
    } else {
        // Calcular total sumando subtotal, descuentos y envío
        total = subtotal - discountAmount + shippingCost;
    }

    // Mostrar los resultados en el DOM
    subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;
    discountsElement.textContent = `$ ${discountAmount.toFixed(2)}`;
    shipmentElement.textContent = `$ ${shippingCost.toFixed(2)}`;
    totalElement.textContent = `$ ${total.toFixed(2)}`;
}

function updateCartList() {
    const cartListContainer = document.querySelector('.carrito-list');

    // Limpia la lista antes de agregar los elementos
    cartListContainer.innerHTML = '';

    // Agrega cada producto al contenedor
    cartProducts.forEach(producto => {
        const item = document.createElement('li');
        item.classList.add('carrito-item');

        // Crear elementos para mostrar el nombre, imagen, precio y cantidad

        const itemName = document.createElement('span');
        itemName.textContent = producto.name;

        const itemImg = document.createElement('img');
        itemImg.src = producto.image;
        itemImg.alt = producto.name;

        const itemPrice = document.createElement('span');
        itemPrice.textContent = `$ ${producto.price.toFixed(2)}`;

        const itemAmount = document.createElement('span');
        itemAmount.textContent = producto.cantidad;

        // Botones para aumentar y disminuir la cantidad

        const substractBtn = document.createElement('button');
        substractBtn.textContent = '-';
        substractBtn.addEventListener('click', () => decreaseCartQuantity(producto.id));

        const addBtn = document.createElement('button');
        addBtn.textContent = '+';
        addBtn.addEventListener('click', () => incrementCartQuantity(producto.id));

        // Agregar elementos al contenedor del producto
        item.appendChild(itemName);
        item.appendChild(itemImg);
        item.appendChild(itemPrice);
        item.appendChild(substractBtn);
        item.appendChild(itemAmount);
        item.appendChild(addBtn);

        // Agregar el producto al contenedor de la lista del carrito
        cartListContainer.appendChild(item);
    });

    // Llamada a la función para calcular subtotal y total
    getCartTotal();
}

function showNotification() {
    const notificationBox = document.getElementById('notificacion');
    // Muestra la notificación
    notificationBox.style.display = 'block';

    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notificationBox.style.display = 'none';
    }, 3000); // 3000 milisegundos = 3 segundos
}

function showPaymentAlert() {
    // Muestra la notificación
    paymentAlert.style.display = 'block';
    clearCart();
}

// Función para vaciar por completo el carrito
document.querySelector('.vaciar-carrito').addEventListener('click', clearCart());