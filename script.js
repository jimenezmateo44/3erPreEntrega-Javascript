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
];

let contenedorProductos = document.getElementById("seccionProductos");

productos.forEach(producto => {
   let tarjetaProductos = document.createElement("div")
   tarjetaProductos.classList.add("tarjeta");
   tarjetaProductos.innerHTML = `
   <img src=./src/media/${producto.imagen}>
   <h3>${producto.nombre}</h3>
   <p>$${producto.precio}</p>
   <a href="#" class="btnAgregarCarrito">Agregar al carrito</a>
   `


    contenedorProductos.appendChild(tarjetaProductos)
})
