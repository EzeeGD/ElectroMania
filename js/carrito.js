// Almacenamos los productos en el localStorage
const carritoID = 'almacenarEnCarrito'

let cartProducts = []

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

function clearCart() {
    cartProducts = []
    storeLocalCart()
    updateCartList()
}

const mostrarNotificacion = () => {
    const notificacion = document.getElementById('notificacion');

    // Muestra la notificación
    notificacion.style.display = 'block';

    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000); // 3000 milisegundos = 3 segundos
}

//funcion para agregar un producto al carrito
function addToCart(productID) {
    if (productID <= 0) return;

    const storeProduct = storeProducts.find((p) => p.id === parseInt(productID));

    // Verifica si el producto ya está en el carrito
    const cartProduct = cartProducts.find((p) => p.id === storeProduct.id);

    if (cartProduct) {
        // Si ya está en el carrito, incrementa la cantidad
        cartProduct.amount += 1;
    } else {
        // Si no está en el carrito, agrégalo con cantidad 1
        storeProduct.amount = 1;
        cartProducts.push(storeProduct);
    }

    storeLocalCart();
    mostrarNotificacion();
    updateCartList();
};

function removeFromCart(productID) {
    // Filtra los productos para excluir el que queremos quitar
    cartProducts = cartProducts.filter((p) => p.id !== productID);

    // Guarda la actualización en localStorage
    storeLocalCart();

    // Actualiza la lista del carrito en el DOM
    updateCartList();
}

function updateCartList() {
    const carritoListContainer = document.querySelector('.carrito-list');

    // Limpia la lista antes de agregar los elementos
    carritoListContainer.innerHTML = '';

    // Agrega cada producto al contenedor
    cartProducts.forEach((producto) => {
        const productoItem = document.createElement('div');
        productoItem.classList.add('carrito-item'); // Agrega una clase para aplicar estilos si es necesario

        // Crear elementos para mostrar el nombre, imagen, cantidad y precio
        const nombreProducto = document.createElement('span');
        nombreProducto.textContent = `${producto.nombre}`;

        const imagenProducto = document.createElement('img');
        imagenProducto.src = producto.imagen;
        imagenProducto.alt = producto.nombre;

        const precioProducto = document.createElement('span');
        precioProducto.textContent = `$ ${producto.precio.toFixed(2)}`;

        const cantidadProducto = document.createElement('span');
        cantidadProducto.textContent = `${producto.amount}`;

        // Agregar elementos al contenedor del producto
        productoItem.appendChild(nombreProducto);
        productoItem.appendChild(imagenProducto);
        productoItem.appendChild(precioProducto);

        // Botones para aumentar y disminuir la cantidad
        const botonRestar = document.createElement('button');
        botonRestar.textContent = '-';
        botonRestar.addEventListener('click', () => decrementCartQuantity(producto.id));
        productoItem.appendChild(botonRestar);

        productoItem.appendChild(cantidadProducto);

        const botonSumar = document.createElement('button');
        botonSumar.textContent = '+';
        botonSumar.addEventListener('click', () => incrementCartQuantity(producto.id));
        productoItem.appendChild(botonSumar);

        // Agregar el producto al contenedor de la lista del carrito
        carritoListContainer.appendChild(productoItem);
    });
    // Llamada a la función para calcular subtotal y total
    getCartTotal();
}

// Función para aumentar la cantidad de un producto en el carrito
const incrementCartQuantity = (productID) => {
    const cartProduct = cartProducts.find((p) => p.id === productID);

    if (cartProduct) {
        // Incrementa la cantidad
        cartProduct.amount += 1;

        // Actualiza la lista del carrito en el DOM
        updateCartList();
    }
};

// Función para disminuir la cantidad de un producto en el carrito
const decrementCartQuantity = (productID) => {
    const cartProduct = cartProducts.find((p) => p.id === productID);

    if (cartProduct.amount > 1) {
        // Disminuye la cantidad, asegurándose de que no sea menor a 1
        cartProduct.amount -= 1;
    } else {
        // Si la cantidad es 1, elimina el producto del carrito
        removeFromCart(productID);
    }

        // Actualiza la lista del carrito en el DOM
        updateCartList();
};

// Función para calcular el subtotal y total
const getCartTotal = () => {
    const subtotalElement = document.querySelector('.subtotal');
    const descuentosElement = document.querySelector('.descuentos');
    const envioElement = document.querySelector('.envio');
    const totalElement = document.querySelector('.total');

    // Calcular subtotal sumando los precios de todos los productos
    const subtotal = cartProducts.reduce((total, producto) => total + (producto.precio * producto.amount), 0);

    // Puedes agregar lógica para calcular descuentos y envío si es necesario
    const descuentos = 10;
    const envio = 500;

    // Calcular total sumando subtotal, descuentos y envío
    const total = subtotal - descuentos + envio;

    // Mostrar los resultados en el DOM
    subtotalElement.textContent = `$ ${subtotal.toFixed(2)}`;
    descuentosElement.textContent = `$ ${descuentos.toFixed(2)}`;
    envioElement.textContent = `$ ${envio.toFixed(2)}`;
    totalElement.textContent = `$ ${total.toFixed(2)}`;
};

// Función para vaciar por completo el carrito
document.querySelector('.vaciar-carrito').addEventListener('click', clearCart());

function alertaPagos(){
    alert('Gracias por tu Compra!!😎')
    clearCart()
}

cartProducts = recoverLocalCart()