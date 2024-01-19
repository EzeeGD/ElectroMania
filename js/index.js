const cardContainer = document.getElementById("cardContainer")
const URL_Productos = '/js/productos.json'
const productos = []

function createCardHTML(producto) {
    let template = `
    <div class="card">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="card-name" id="product-description">${producto.nombre}</div>
        <div class="card-description">${producto.descripcion}</div>
        <div class="card-price" id="unit-price">\$ ${producto.precio}</div>
        <div class="card-button">
        <button class="button button-outline button-add" id="${producto.id}" title="Clic para agregar al carrito">Agregar al Carrito</button>
        </div>
    </div>`;

    return template;
}


const activarClickEnBotones = () => {
    const botones = document.querySelectorAll('button.button-outline.button-add')

    for (let boton of botones) {
        boton.addEventListener('click', (event) => {
            if (event.target == null) return

            if ("id" in event.target) {
                agregarAlCarrito(event.target.id)
            }
        })
    }
}


function loadProducts(array) {
    const container = document.querySelector('.container');
    array.forEach(element => {
        let card = document.createElement('div');
        card.innerHTML = createCardHTML(element);

        container.appendChild(card);
    });
    activarClickEnBotones();
}

const errorLoad = () => {
    if (productos.length === 0) {
        // Muestra el mensaje de error
        document.getElementById('errorCard').style.display = 'block';
    }
}


const obtenerProductos = () => {
    fetch(URL_Productos)
        .then((response) => response.json())
        .then((data) => {
            productos.push(...data);
            loadProducts(productos);
            errorLoad();
        })
        .catch((error)=>{
            console.error(error);
            errorLoad();
        })
    }

obtenerProductos()


// Función para abrir la ventana emergente de sesion
document.getElementById('open-sesion').addEventListener('click', function() {
    document.getElementById('sesion').style.display = 'block';
})

function closeSesion() {
    document.getElementById('sesion').style.display = 'none';
}

function mostrarAlertaSesion(){
    alert('Has iniciado Sesion')
}

// Funcion para abrir registro

document.getElementById('open-register').addEventListener('click', function(){
    document.getElementById('register').style.display = 'block'
})

function closeRegister() {
    document.getElementById('register').style.display = 'none';
}
function mostrarAlertaRegister(){
    alert('El usuario ah sido registrado')
}

// Funcion para abrir ventana emergente de info
document.getElementById('open-info').addEventListener('click', function(){
    document.getElementById('info').style.display = 'block';
})

function closeInfo() {
    document.getElementById('info').style.display = 'none';
}

// Funcion para abrir carrito

document.getElementById('open-carrito').addEventListener('click', function() {
    document.getElementById('carrito').style.display = 'flex';
})

function closeCarrito() {
    document.getElementById('carrito').style.display = 'none';
}

document.getElementById('menu_responsive').addEventListener('click', function(){
    document.getElementById('menu-responsive').style.display = 'flex'
})