// FETCH DE PRODUCTOS
let productos; 

const obtenerProductos = () => {
    fetch('./src/productos/productos.json')
    .then(res => res.json())
    .then(data => {
        productos = data;
        renderizarTarjetas(productos);
        renderizarCarrito(carrito);
        addToCartToastify();
    })
}

//FUNCION SPINNER DE CARGA
window.onload = () => {
    document.getElementById("loading").style.display = "none";
}

//AGREGAR PRODUCTOS AL CARRITO
let carrito = [];

if (localStorage.getItem("carrito")) {
    carrito = JSON.parse(localStorage.getItem("carrito"));
}

//Funcion de animacion toastify "Producto agregado al carrito!"
const addToCartToastify = () => {
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

        });
    });
}

//Invocar la funcion de agregar al carrito con el productoId
const agregarAlCarrito = (productos, evento, carrito) => {
    let productoOriginal = productos.find(producto => producto.id === Number(evento.target.id));
    let productoEnCarrito = carrito.find(producto => producto.id === productoOriginal.id);

    productoEnCarrito ? (
        productoEnCarrito.unidades++,
        productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precio
    ) : (
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precio: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio,
            imagen: productoOriginal.imagen
        }),
        console.log(carrito)
    )

    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarCarrito(carrito);
}
// FIN AGREGAR PRODUCTOS AL CARRITO

//RENDERIZADO PRODUCTOS

const renderizarTarjetas = (productos) => {

    let contenedorProductos = document.getElementById("seccionProductos");

    contenedorProductos.innerHTML = "";

    productos.forEach(({ nombre, precio, imagen, id }) => { 
        let tarjetaProductos = document.createElement("div");
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
            `;
        contenedorProductos.appendChild(tarjetaProductos);

        const productoId = document.getElementById(id);

        //Invocar la funcion de agregar al carrito con el productoId
        productoId.addEventListener('click', (e) => agregarAlCarrito(productos, e, carrito));
    });
}
addToCartToastify(); //Funcion de animacion toastify

//FIN RENDERIZADO PRODUCTOS 

//BUSCAR PRODUCTOS
const buscarProductos = (productos, inputBuscador) => {
    let productosEncontrados = productos.filter(producto => producto.nombre.includes(inputBuscador.value.toUpperCase()));
    renderizarTarjetas(productosEncontrados);
    addToCartToastify();

}

let buscadorProductos = document.getElementById("svgBuscar");
let inputBuscador = document.getElementById("inputSearch");
let inputCheck = document.getElementById("inputCheck");

buscadorProductos.addEventListener('click', () => {
    inputBuscador.classList.toggle("active");
    inputCheck.classList.toggle("active");
});

inputCheck.addEventListener('click', () => {
    buscarProductos(productos, inputBuscador);
});

inputBuscador.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        buscarProductos(productos, inputBuscador);
    }
});

//FIN BUSCAR PRODUCTOS

//RENDERIZADO DE CARRITO
let botonVerCarrito = document.getElementById("btnVerCarrito");
let contenedor =  document.getElementById("seccionCarrito");

const renderizarCarrito = (productos) => {
     contenedor.innerHTML = "";

    let opcionesCompra = document.createElement("div");
    opcionesCompra.className = "opcionesCompra";

    if (carrito.length === 0 || localStorage.length === 0) {
        carrito = [];
        opcionesCompra.innerHTML = `
        <p class="carritoVacio">Aun no hay productos en el carrito :(</p>
        `;
        contenedor.append(opcionesCompra);
    } else {
            let infoCompra = document.createElement("div");

            infoCompra.className="infoCompra";

            infoCompra.innerHTML = `
                <h2>Tu carrito</h2>
                <a id="btnCerrarCarrito">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg>
                </a>   
            `;
            contenedor.append(infoCompra);

            productos.forEach(( {nombre, precio, unidades, subtotal, imagen, id }) => {
                let tarjetaProducto = document.createElement("div");

                tarjetaProducto.className = "tarjetaCarrito";
                tarjetaProducto.id = `${id}`;
                tarjetaProducto.innerHTML = `
                    <img id="imgCarrito" src=./src/media/${imagen}>
                    <p><span>Nombre</span> <br>${nombre}</p>
                    <p><span>Precio</span> <br>$${precio}</p>
                    <p><span>Cantidad</span> <br>${unidades}</p>
                    <p><span>Subtotal</span> <br>$${subtotal}</p>
                    <a id="${id}" class="botonEliminarCarrito">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#E27602" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                        </svg>
                    </a> 
                `;
                contenedor.appendChild(tarjetaProducto);
            });


        opcionesCompra.innerHTML = `
            <div class="botonesCarrito">
                <a id="btnFinalizarCompra">Finalizar Compra</a>
                <a id="btnSeguirCompra">Seguir Comprando</a>
            </div>
            
        `;
        contenedor.append(opcionesCompra);
        
        //FUNCION ELIMINAR DEL CARRITO
        const eliminarDelCarrito = (productoId, productos) => {
            let productoEnCarrito = productos.find(producto => producto.id === Number(productoId));
        
            if (productoEnCarrito) {
                if (productoEnCarrito.unidades > 1) {
                    productoEnCarrito.unidades--;
                    productoEnCarrito.subtotal = productoEnCarrito.unidades * productoEnCarrito.precio;
                } else {
                    // Si solo hay una unidad, elimina el producto del carrito
                    carrito = productos.filter(producto => producto.id !== Number(productoId));
                }
                localStorage.setItem("carrito", JSON.stringify(carrito));
                renderizarCarrito(carrito);
            }    
        }
        //FIN FUNCION ELIMINAR DEL CARRITO
            
        //BOTON ELIMINAR DEL CARRITO
        let botonEliminarCarrito = document.querySelectorAll(".botonEliminarCarrito");
        
        botonEliminarCarrito.forEach(boton => {
            boton.addEventListener('click', () => {
                console.log(carrito);
                eliminarDelCarrito(boton.id, productos);
            });
        });

        let botonCerrarCarrito = document.getElementById("btnCerrarCarrito");
            
        botonCerrarCarrito.addEventListener('click', () => {
            contenedor.classList.remove("carritoActive");
        });

        let botonSeguirCompra = document.getElementById("btnSeguirCompra");
        
        botonSeguirCompra.addEventListener('click', () => {
            contenedor.classList.remove("carritoActive");
        });

        let botonFinalizarCompra = document.getElementById("btnFinalizarCompra");
            botonFinalizarCompra.addEventListener('click', () => {
                finalizarCompraToastify();
                contenedor.classList.remove("carritoActive");
                localStorage.clear();
                
            });
    }
} //Fin funcion renderizar carrito
botonVerCarrito.addEventListener('click', () => {
    renderizarCarrito(carrito);
    contenedor.classList.toggle("carritoActive");    
});

//FIN RENDERIZADO DE CARRITO

//Funcion de animacion toastify "Compra realizada con exito!"
const finalizarCompraToastify = () => {
            //toastify notificacion
            Toastify({
                text: "Compra realizada con exito!",
                close: false,
                style: {
                    background: "#198754",
                    color: 'white',
                },
                duration: 3000,
                gravity: 'top',
                position: 'right'
            }).showToast();
            //toastify notificacion
}

//FILTRAR PRODUCTOS
const buscarProductosPorCategoria = (productos, categoriaSeleccionada) => {
    if (categoriaSeleccionada === "default") {
        renderizarTarjetas(productos);
        addToCartToastify();
        return;
    }
    let productosEncontrados = productos.filter(producto => producto.categoria === categoriaSeleccionada);
    renderizarTarjetas(productosEncontrados);
    addToCartToastify();
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
    formFiltrado.classList.toggle("activeForm");
});
//FIN FILTRAR PRODUCTOS


//FOOTER
let currentYear = new Date().getFullYear();
let copyFooter = document.getElementById("copyright");

copyFooter.innerHTML = `
    <p>Desarrollado por Mateo Jimenez. Todos los derechos reservados &copy ${currentYear}</p>
`;
//FOOTER
obtenerProductos();