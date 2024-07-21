let storeProducts = [];

const cardContainer = document.getElementById("cardContainer");

// ! Event listeners
document.getElementById('open-sesion').addEventListener('click', () => toggleSession(true));
document.getElementById('close-sesion').addEventListener('click', () => toggleCarrito(false));

document.getElementById('open-info').addEventListener('click', () => toggleInfo(true));
document.getElementById('close-info').addEventListener('click', () => toggleInfo(false));

document.getElementById('open-carrito').addEventListener('click', () => toggleCarrito(true));
document.getElementById('close-carrito').addEventListener('click', () => toggleCarrito(false));

document.getElementById('open-register').addEventListener('click', () => toggleRegister(true));
document.getElementById('close-register').addEventListener('click', (event) => toggleRegister(false));


const session = document.getElementById('sesion');
const info = document.getElementById('info');
const carrito = document.getElementById('carrito');
const register = document.getElementById('register');
const errorCard = document.getElementById('errorCard');

function toggleVisibility(event, state) {
    event.target.style.display = state ? 'block' : 'none';
}

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

function toggleErrorCard(state) {
    errorCard.style.display = state ? 'block' : 'none';
}

function thousandSep(x) {
    return x.toString().replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function createCardElement(product) {
    const card = document.createElement('div');
    card.className = 'card';
    card.dataset.id = product.id;

    const img = document.createElement('img');
    img.src = product.image;
    img.alt = product.name;

    const cardName = document.createElement('div');
    cardName.className = 'card-name';
    cardName.textContent = product.name;

    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    cardDescription.textContent = product.description;

    const cardPrice = document.createElement('div');
    cardPrice.className = 'card-price';
    cardPrice.textContent = `\$ ${thousandSep(product.price)}`;

    const cardButton = createCardButton(product);

    card.appendChild(img);
    card.appendChild(cardName);
    card.appendChild(cardDescription);
    card.appendChild(cardPrice);
    card.appendChild(cardButton);

    return card;
}

function createCardButton(product) {
    const button = document.createElement('button');
    button.id = product.id;
    button.className = 'button button-outline button-add';
    if (product.stock > 0) {
        button.title = 'Click para agregar al carrito.';
        button.textContent = 'Agregar';

        button.addEventListener('click', (event) => {
            addToCart(event.target.id);
        });
    } else {
        button.classList.add('disabled');
        button.title = 'No tenemos stock en este momento.';
        button.textContent = 'Sin Stock';
    }


    const cardButton = document.createElement('div');
    cardButton.className = 'card-button';
    cardButton.appendChild(button);

    return cardButton;
}

function displayProducts(products) {
    cardContainer.innerHTML = '';

    products.forEach(product => {
        const card = createCardElement(product);
        cardContainer.appendChild(card);
    });
}

// Load products from server
async function loadProducts() {
    try {
        const response = await fetch('/api/products');
        storeProducts = await response.json();
        if (!storeProducts.length) {
            toggleErrorCard(true);
            throw new Error("No products found");
        }
        displayProducts(storeProducts);
        toggleErrorCard(false);
    } catch (error) {
        console.error(error);
        toggleErrorCard(true);
    }
}

//document.getElementById('menu-responsive').addEventListener('click', function() {
//    document.getElementById('menu-responsive').style.display = 'flex'
//})

// Function to initialize the cart
function initializeCart() {
    loadCart();
    loadProducts();
    updateCartList();
}

function showRegisterAlert() {
    alert("Test concluido!")
}

function showLoginAlert() {
    alert("Test concluido!")
}

// Initialize cart on web page load
window.onload = function(){
    initializeCart();
};