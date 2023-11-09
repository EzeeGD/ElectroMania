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

const carritoProductos = recuperarCarrito()

const agregarAlCarrito = (productoID) => {
    if (productoID <= 0) return

    const resultado = productos.find((producto) => producto.id === parseInt(productoID))

    if (!resultado) {
        console.warn(`No se encontro el producto ${productoID} 😥`)
        return
    }

    console.info(`Se añadio el producto ${productoID} al carrito`)
    carritoProductos.push(resultado)
    almacenarCarrito()
}