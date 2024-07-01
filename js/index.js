const cardContainer = document.getElementById("cardContainer")
const URL_Productos = './js/products.json'
const storeProducts = []

function createCardHTML(p) {
    let template = `
    <div class="card">
        <img src="${p.image}" alt="${p.name}">
        <div class="card-name" id="product-description">${p.name}</div>
        <div class="card-description">${p.description}</div>
        <div class="card-price" id="unit-price">\$ ${p.price}</div>
        <div class="card-button">
        <button class="button button-outline button-add" id="${p.id}" title="Clic para agregar al carrito">Agregar al Carrito</button>
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
                addToCart(event.target.id)
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
    if (storeProducts.length === 0) {
        // Muestra el mensaje de error
        document.getElementById('errorCard').style.display = 'block';
    }
}


const obtenerProductos = () => {
    fetch(URL_Productos)
        .then((response) => response.json())
        .then((data) => {
            storeProducts.push(...data);
            loadProducts(storeProducts);
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

// Funcion para abrir registro
document.getElementById('open-register').addEventListener('click', function(){
    document.getElementById('register').style.display = 'block'
})

function closeRegister() {
    document.getElementById('register').style.display = 'none';
}


document.getElementById('menu_responsive').addEventListener('click', function(){
    document.getElementById('menu-responsive').style.display = 'flex'
})

function mostrarAlertaSesion(){
    alert('Has iniciado Sesion')
}

function mostrarAlertaRegister(){
    alert('El usuario ah sido registrado')
}
