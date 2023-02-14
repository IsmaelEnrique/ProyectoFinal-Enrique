async function infoBD(){
    const respuesta=await fetch("./productos.json")
    const productoBD= await respuesta.json()
    Programa(productoBD)
}

infoBD()
function Programa(productos) {

    let carritoCompras = []
    if (localStorage.getItem("carritoCompras")) {
        let carroJSON = localStorage.getItem("carritoCompras")
        carritoCompras = JSON.parse(carroJSON)
    }

    let contenedor = document.getElementById("contenedorProductos")
    let contendorDeCarro = document.getElementById("contenedorDeCarro")
    let filtrado = document.getElementById("Filtrar")
    let buscar = document.getElementById("buscar")
    buscar.onclick = filtro

    renderizarProductos(productos)
    renderizarCarro(carritoCompras)

    let verCarrito = document.getElementById("BotonCarrito")
    verCarrito.addEventListener("click", verCarroCompra)

    function verCarroCompra() {
        contenedor.classList.toggle("ocultar")
        contenedorDeCarro.classList.toggle("ocultar")
    }

    function FinalizarCompra() {
        carritoCompras = []
        localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
        renderizarCarro(carritoCompras)
        mostrarSweetAlert("Gracias por su compra", "Vuelva pronto!", 'success', true)
    }
    function LimpiarCarro(){
        carritoCompras = []
        localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras));
        renderizarCarro(carritoCompras)
    }

    function filtro(e) {
        let productosFiltrados = productos.filter(producto => producto.nombre.toLocaleLowerCase().includes(filtrado.value.toLocaleLowerCase()) ||
            producto.categoria.toLocaleLowerCase().includes(filtrado.value.toLocaleLowerCase()))
        renderizarProductos(productosFiltrados)
    }
    function renderizarProductos(arrayProductos) {
        contenedorProductos.innerHTML = ""
        arrayProductos.forEach(producto => {
            let cartasProductos = document.createElement("div")
            cartasProductos.classList.add("producto")

            cartasProductos.innerHTML = `
            <img src="${producto.img}"/>
            <h3>${producto.nombre}</h3>
            <p>$${producto.precio}</p>
            <button id=${producto.id}>Agregar al carrito</button>
            `

            contenedor.append(cartasProductos)
            let boton = document.getElementById(producto.id)
            boton.onclick = agregarCarro
        })
    }
    function agregarCarro(e) {
        let identificacion = e.target.id
        let buscarProducto = productos.find(producto => producto.id == identificacion)
        let productoEnCarro = carritoCompras.find(producto => producto.id == buscarProducto.id)

        mostrarSweetAlert("Producto agregado con exitos","", 'success',3000,false)

        if (productoEnCarro) {
            let posEnCarro = carritoCompras.findIndex(producto => producto == productoEnCarro)
            carritoCompras[posEnCarro].unidades++
            carritoCompras[posEnCarro].costo = carritoCompras[posEnCarro].precio * carritoCompras[posEnCarro].unidades
        } else {
            buscarProducto.unidades = 1
            buscarProducto.costo = buscarProducto.precio
            carritoCompras.push(buscarProducto)
        }
        localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras))

        renderizarCarro(carritoCompras)
    }

    function renderizarCarro(arrayCarrito) {
        contendorDeCarro.innerText = ""
        arrayCarrito.forEach(producto => {
            let cartasProductos = document.createElement("div")
            cartasProductos.classList.add("itemCarro")

            cartasProductos.innerHTML += `
            <h3>${producto.nombre}</h3>
            <button id=dec${producto.id} onclick=decrementar(${producto.id})>-</button>
            <p>${producto.unidades}</p>
            <button id=inc${producto.id} onclick=incrementar(${producto.id})>+</button>
            <p>$${producto.costo}</p>
            `;
            contendorDeCarro.appendChild(cartasProductos)

        })
        contendorDeCarro.innerHTML += `<div id="BotonesUltimos">
        <button id="CancelarCompra">FinalizarCompra Compra</button>
        <button id="BorrarCarro">Limpiar</button></div>`
        let cancelar = document.getElementById("CancelarCompra")
        cancelar.addEventListener("click", FinalizarCompra)
        let borrarCarro = document.getElementById("BorrarCarro")
        borrarCarro.addEventListener("click", LimpiarCarro)
    }
    console.log(carritoCompras)
    function decrementar(id) {
        let posicion = carritoCompras.findIndex(producto => producto.id == id)
        if (carritoCompras[posicion].unidades > 1) {
            carritoCompras[posicion].unidades--
            carritoCompras[posicion].costo = carritoCompras[posicion].precio * carritoCompras[posicion].unidades
        } else {
            carritoCompras.splice(posicion, 1)
        }
        localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras))
        renderizarCarro(carritoCompras)
    }

    function incrementar(id) {
        let pos = carritoCompras.findIndex(producto => producto.id == id)
        carritoCompras[pos].unidades++
        carritoCompras[pos].costo = carritoCompras[pos].precio * carritoCompras[pos].unidades
        localStorage.setItem("carritoCompras", JSON.stringify(carritoCompras))
        renderizarCarro(carritoCompras)
    }

    function mostrarSweetAlert(titulo, texto, icono, mostrarBoton, urlImagen, anchoImagen, altoImagen) {
        Swal.fire({
          title: titulo,
          text: texto,
          icon: icono,
          showConfirmButton: mostrarBoton,
          imageUrl: urlImagen,
          imageWidth: anchoImagen,
          imageHeight: altoImagen
        })
    }
}