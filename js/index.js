const cardContainer = document.getElementById("cardContainer")
const URL_Productos = './js/products.json'
const storeProducts = []

// ! Event listeners
document.getElementById('open-sesion').addEventListener('click', () => toggleSession(true));
document.getElementById('close-sesion').addEventListener('click', () => toggleCarrito(false));

document.getElementById('open-info').addEventListener('click', () => toggleInfo(true));
document.getElementById('close-info').addEventListener('click', () => toggleInfo(false));

document.getElementById('open-carrito').addEventListener('click', () => toggleCarrito(true));
document.getElementById('close-carrito').addEventListener('click', () => toggleCarrito(false));

document.getElementById('open-register').addEventListener('click', () => toggleRegister(true));
document.getElementById('close-register').addEventListener('click', () => toggleRegister(false));

function toggleSession(state) {
    session.style.display = state ? 'block' : 'none';
}

function toggleInfo(state) {
    info.style.display = state ? 'block' : 'none';
}

function toggleCarrito(state) {
    carrito.style.display = state ? 'block' : 'none';
}

function toggleRegister(state) {
    register.style.display = state ? 'block' : 'none';
}


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

document.getElementById('menu_responsive').addEventListener('click', function(){
    document.getElementById('menu-responsive').style.display = 'flex'
})

function mostrarAlertaSesion(){
    alert('Has iniciado Sesion')
}

function mostrarAlertaRegister(){
    alert('El usuario ah sido registrado')
}
