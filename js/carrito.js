// Almacenamos los productos en el localStorage
const carritoID = 'almacenarEnCarrito'

const almacenarCarrito = () => {
    if (carritoProductos.length > 0) {
        localStorage.setItem(carritoID, JSON.stringify(carritoProductos))
    }
}

const recuperarCarrito = () => {
    const item = localStorage.getItem(carritoID) ?? "[]"
    return JSON.parse(item) || [];
}

let carritoProductos = recuperarCarrito()

//funcion para agregar un producto al carrito
const agregarAlCarrito = (productoID) => {
    if (productoID <= 0) return;

    const resultado = productos.find((producto) => producto.id === parseInt(productoID));

// Verifica si el producto ya está en el carrito
const productoEnCarrito = carritoProductos.find((producto) => producto.id === resultado.id);

if (productoEnCarrito) {
    // Si ya está en el carrito, incrementa la cantidad
    productoEnCarrito.cantidad += 1;
} else {
    // Si no está en el carrito, agrégalo con cantidad 1
    resultado.cantidad = 1;
    carritoProductos.push(resultado);
}

    almacenarCarrito();
    mostrarNotificacion();
    actualizarListaCarrito();
};

const mostrarNotificacion = () => {
    const notificacion = document.getElementById('notificacion');

    // Muestra la notificación
    notificacion.style.display = 'block';

    // Oculta la notificación después de 3 segundos
    setTimeout(() => {
        notificacion.style.display = 'none';
    }, 3000); // 3000 milisegundos = 3 segundos
}

const quitarDelCarrito = (productoID) => {
    // Filtra los productos para excluir el que queremos quitar
    carritoProductos = carritoProductos.filter((producto) => producto.id !== productoID);

    // Guarda la actualización en localStorage
    almacenarCarrito();

    // Actualiza la lista del carrito en el DOM
    actualizarListaCarrito();
}

const actualizarListaCarrito = () => {
    const carritoListContainer = document.querySelector('.carrito-list');

    // Limpia la lista antes de agregar los elementos
    carritoListContainer.innerHTML = '';

    // Agrega cada producto al contenedor
    carritoProductos.forEach((producto) => {
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
        cantidadProducto.textContent = `${producto.cantidad}`;

        // Agregar elementos al contenedor del producto
        productoItem.appendChild(nombreProducto);
        productoItem.appendChild(imagenProducto);
        productoItem.appendChild(precioProducto);

        // Botones para aumentar y disminuir la cantidad
        const botonRestar = document.createElement('button');
        botonRestar.textContent = '-';
        botonRestar.addEventListener('click', () => restarCantidad(producto.id));
        productoItem.appendChild(botonRestar);

        productoItem.appendChild(cantidadProducto);

        const botonSumar = document.createElement('button');
        botonSumar.textContent = '+';
        botonSumar.addEventListener('click', () => sumarCantidad(producto.id));
        productoItem.appendChild(botonSumar);

        // Agregar el producto al contenedor de la lista del carrito
        carritoListContainer.appendChild(productoItem);
    });
    // Llamada a la función para calcular subtotal y total
    calcularTotal();
};

// Función para aumentar la cantidad de un producto en el carrito
const sumarCantidad = (productoID) => {
    const productoEnCarrito = carritoProductos.find((producto) => producto.id === productoID);

    if (productoEnCarrito) {
        // Incrementa la cantidad
        productoEnCarrito.cantidad += 1;

        // Actualiza la lista del carrito en el DOM
        actualizarListaCarrito();
    }
};

// Función para disminuir la cantidad de un producto en el carrito
const restarCantidad = (productoID) => {
    const productoEnCarrito = carritoProductos.find((producto) => producto.id === productoID);

    if (productoEnCarrito.cantidad > 1) {
        // Disminuye la cantidad, asegurándose de que no sea menor a 1
        productoEnCarrito.cantidad -= 1;
    } else {
        // Si la cantidad es 1, elimina el producto del carrito
        quitarDelCarrito(productoID);
    }

        // Actualiza la lista del carrito en el DOM
        actualizarListaCarrito();
};

// Función para calcular el subtotal y total
const calcularTotal = () => {
    const subtotalElement = document.querySelector('.subtotal');
    const descuentosElement = document.querySelector('.descuentos');
    const envioElement = document.querySelector('.envio');
    const totalElement = document.querySelector('.total');

    // Calcular subtotal sumando los precios de todos los productos
    const subtotal = carritoProductos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);

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
document.querySelector('.vaciar-carrito').addEventListener('click', function () {
    carritoProductos = [];

    almacenarCarrito();

    actualizarListaCarrito();
});

function alertaPagos(){
    alert('Gracias por tu Compra!!😎')
    carritoProductos = [];
    almacenarCarrito();
    actualizarListaCarrito();
}