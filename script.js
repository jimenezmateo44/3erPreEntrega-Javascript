const productos = [
    {
        id: 1,
        nombre: 'Vans Tee amarilla',
        precio: 17500,
        imagen: "remeravans.jpeg",
        stock: 5,
        categoria: 'Remeras'
    },
    {
        id: 2,
        nombre: 'Jordan Tee crema',
        precio: 21000,
        imagen: 'remerajordan.jpeg',
        stock: 3,
        categoria: 'Remeras' 
    },
    {
        id: 3,
        nombre: 'Nike Travis Scott low',
        precio: 1200000,
        imagen: 'niketravis.jpeg',
        stock: 1,
        categoria: 'Calzado'
    },
    {
        id: 4,
        nombre: 'Nike Backpack negra',
        precio: 35000,
        imagen: 'mochilanike.jpeg',
        stock: 4,
        categoria: 'Accesorios'
    },
    {
        id: 5,
        nombre: 'Yankees New Era hat',
        precio: 14000,
        imagen: 'gorranyc.jpeg',
        stock: 10,
        categoria: 'Accesorios'
    },
    {
        id: 6,
        nombre: 'Buzo Urban Nike',
        precio: 60000,
        imagen: 'buzonike.jpeg',
        stock: 5,
        categoria: 'Buzos'
    },
    {
        id: 7,
        nombre: 'Piluso Adidas Classic',
        precio: 19000,
        imagen: 'pilusoadidas.jpeg',
        stock: 5,
        categoria: 'Accesorios'
    },
    {
        id: 8,
        nombre: 'Buzo Puma Street',
        precio: 52000,
        imagen: 'buzopuma.jpeg',
        stock: 5,
        categoria: 'Buzos'
    },
    {
        id: 9,
        nombre: 'Riñonera Jordan',
        precio: 23000,
        imagen: 'rinonerajordan.jpeg',
        stock: 5,
        categoria: 'Accesorios'
    },
];

//renderizado de productos

let contenedorProductos = document.getElementById("seccionProductos");

productos.forEach(producto => {
   let tarjetaProductos = document.createElement("div")
   tarjetaProductos.classList.add("tarjeta");
   tarjetaProductos.innerHTML = `
   <img src=./src/media/${producto.imagen}>
   <h3>${producto.nombre}</h3>
   <p>$${producto.precio}</p>
   <div class="btnTarjeta">
   <a href="#" class="btnAgregarCarrito">Añadir al carrito</a>
   <a href="#" class="agregarFavoritos"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="black" class="bi bi-heart" viewBox="0 0 16 16">
   <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
 </svg></a>
    </div>
   `


    contenedorProductos.appendChild(tarjetaProductos)
})

//renderizado de productos

//buscar productos

let buscadorProductos = document.getElementById("svgBuscar");
let inputBuscador = document.getElementById("inputSearch");
let inputCheck = document.getElementById("inputCheck");

buscadorProductos.addEventListener('click', () => {
    inputBuscador.classList.toggle("active")
    inputCheck.classList.toggle("active")
})

//filtrar productos
let filtradorProductos = document.getElementById("svgFiltrar");
let formFiltrado = document.getElementById("formFiltrar");

filtradorProductos.addEventListener('click', () => {
    formFiltrado.classList.toggle("activeForm")
})










// footer

let currentYear = new Date().getFullYear();

let copyFooter = document.getElementById("copyright");

copyFooter.innerHTML = `
    <p>Desarrollado por Mateo Jimenez. Todos los derechos reservados &copy ${currentYear}</p>
`
//footer