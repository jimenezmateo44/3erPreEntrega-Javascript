const productos = [
    {
        id: 1,
        nombre: 'VANS TEE AMARILLA',
        precio: 17500,
        imagen: "remeravans.jpeg",
        stock: 5,
        categoria: 'Remeras'
    },
    {
        id: 2,
        nombre: 'JORDAN TEE CREMA',
        precio: 21000,
        imagen: 'remerajordan.jpeg',
        stock: 3,
        categoria: 'Remeras' 
    },
    {
        id: 3,
        nombre: 'NIKE TRAVIS SCOTT LOW',
        precio: 1200000,
        imagen: 'niketravis.jpeg',
        stock: 1,
        categoria: 'Calzado'
    },
    {
        id: 4,
        nombre: 'NIKE BACKPACK NEGRA',
        precio: 35000,
        imagen: 'mochilanike.jpeg',
        stock: 4,
        categoria: 'Accesorios'
    },
    {
        id: 5,
        nombre: 'YANKEES NEW ERA HAT',
        precio: 14000,
        imagen: 'gorranyc.jpeg',
        stock: 10,
        categoria: 'Accesorios'
    },
    {
        id: 6,
        nombre: 'BUZO URBAN NIKE',
        precio: 60000,
        imagen: 'buzonike.jpeg',
        stock: 5,
        categoria: 'Buzos'
    },
    {
        id: 7,
        nombre: 'PILUSO ADIDAS CLASSIC',
        precio: 19000,
        imagen: 'pilusoadidas.jpeg',
        stock: 5,
        categoria: 'Accesorios'
    },
    {
        id: 8,
        nombre: 'BUZO PUMA STREET',
        precio: 52000,
        imagen: 'buzopuma.jpeg',
        stock: 5,
        categoria: 'Buzos'
    },
    {
        id: 9,
        nombre: 'RIÑONERA JORDAN',
        precio: 23000,
        imagen: 'rinonerajordan.jpeg',
        stock: 5,
        categoria: 'Accesorios'
    },
];

//FUNCION SPINNER DE CARGA
window.onload = () => { 
    document.getElementById("loading").style.display = "none" 
}

//AGREGAR PRODUCTOS AL CARRITO
let carrito = [];


const addToCartEvent = () => {
    let agregarCarrito = document.querySelectorAll(".btnAgregarCarrito");

    agregarCarrito.forEach(agregarCarrito => {
        agregarCarrito.addEventListener('click', () => {
            //toastify notificacion
            Toastify({
                text: "Producto agregado al carrito!",
                close: false,
                style: {
                    background: "#F8EFE0",
                    color: 'black'
                },
                duration: 3000,
                gravity: 'top',
                position: 'right'
            }).showToast();
            //toastify notificacion
        
        })
    })
}


// FIN AGREGAR PRODUCTOS AL CARRITO

//RENDERIZADO PRODUCTOS

const renderizarTarjetas = (productos) => {
    
    let contenedorProductos = document.getElementById("seccionProductos");
    
    contenedorProductos.innerHTML = "";

    productos.forEach(({ nombre, precio, imagen, id}) => { 
    let tarjetaProductos = document.createElement("div")
    tarjetaProductos.classList.add("tarjeta");
    tarjetaProductos.innerHTML = `
    <img src=./src/media/${imagen}>
    <h3>${nombre}</h3>
    <p>$${precio}</p>
    <div class="btnTarjeta">
    <a id="${id}"class="btnAgregarCarrito">Añadir al carrito</a>
    <a class="agregarFavoritos"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-heart" viewBox="0 0 16 16">
    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
    </svg></a>
        </div>
    `
        contenedorProductos.appendChild(tarjetaProductos);

        let productoId = document.getElementById(id);

        productoId.addEventListener('click', (e) => agregarAlCarrito(productos, e, carrito))
    })
};


renderizarTarjetas(productos);
addToCartEvent();

 //Invocar la funcion de agregar al carrito con el productoId
 const agregarAlCarrito = (productos, evento, carrito) => {
    let productoOriginal = productos.find(producto => producto.id === Number(evento.target.id))
    let productoEnCarrito = carrito.find(producto => producto.id === productoOriginal.id)

    if (productoEnCarrito) {
        productoEnCarrito.unidades++;
        productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precio;
    } else {
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precio: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio 
        })
    }
    console.log(carrito);
}

//FIN RENDERIZADO PRODUCTOS


//BUSCAR PRODUCTOS
const buscarProductos = (productos, inputBuscador) => {
    let productosEncontrados = productos.filter(producto => producto.nombre.includes(inputBuscador.value.toUpperCase()));
    renderizarTarjetas(productosEncontrados);
    addToCartEvent();

}

let buscadorProductos = document.getElementById("svgBuscar");
let inputBuscador = document.getElementById("inputSearch");
let inputCheck = document.getElementById("inputCheck");

buscadorProductos.addEventListener('click', () => {
    inputBuscador.classList.toggle("active")
    inputCheck.classList.toggle("active")
})

inputCheck.addEventListener('click', () => {
    buscarProductos(productos, inputBuscador);
});

inputBuscador.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        buscarProductos(productos, inputBuscador);
    }   
})

//FIN BUSCAR PRODUCTOS

//FILTRAR PRODUCTOS
const buscarProductosPorCategoria = (productos, categoriaSeleccionada) => {
    if (categoriaSeleccionada === "default") {
        renderizarTarjetas(productos);  
        addToCartEvent();
        return;
    }
    let productosEncontrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    renderizarTarjetas(productosEncontrados);
    addToCartEvent();
}

let formFiltrado = document.getElementById("formFiltrar");
let selectCategorias = document.getElementById("Categorias");

selectCategorias.addEventListener('change', () => {
    buscarProductosPorCategoria(productos, selectCategorias.value);
});

formFiltrado.addEventListener('submit', event => {
    event.preventDefault();  // Evita que el formulario se envíe
    buscarProductosPorCategoria(productos, selectCategorias.value);
});


let filtradorProductos = document.getElementById("svgFiltrar");

filtradorProductos.addEventListener('click', () => {
    formFiltrado.classList.toggle("activeForm")
})
//FIN FILTRAR PRODUCTOS

// footer

let currentYear = new Date().getFullYear();
let copyFooter = document.getElementById("copyright");

copyFooter.innerHTML = `
    <p>Desarrollado por Mateo Jimenez. Todos los derechos reservados &copy ${currentYear}</p>
`
//footer