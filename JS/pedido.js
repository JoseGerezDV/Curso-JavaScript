const carro = new Carrito();
const carrito = document.getElementById('carrito');
const productos = document.getElementById('lista-productos');
const listaProductos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');
const procesarPedidoBtn = document.getElementById('procesar-pedido');

cargarEventos();

function cargarEventos (){
    productos.addEventListener('click', (e)=>{carro.comprarProducto(e)});

    carrito.addEventListener('click', (e)=>{carro.eliminarProducto(e)});

    vaciarCarritoBtn.addEventListener('click',(e)=>{carro.vaciarCarrito(e)});

    document.addEventListener("DOMContentLoaded", () => {
		carro.leerLocalStorage();
		fetchProductos();
	});


    procesarPedidoBtn.addEventListener('click', (e)=> {carro.procesarPedido(e)});
}

async function fetchProductos() {
	let res = await fetch("../DATA/productos.json");
	let data = await res.json();
	let html = "";
	data.forEach((producto, index) => {
		curr = `
        <div class="unProducto fadeIn product_item" category="${producto.category}">
			<p class="item-title">${producto.titulo}</p>
			<img class="imgResponsive" src="${producto.imagen}">
			<div class="d-flex justify-content-between align-items-center">
				<a class=" addToCart btn btn-primary agregar agregar-carrito" data-id="${producto.id}">Agregar</a>
				<p class="precio">${producto.precio}</p>
			</div>
    </div>
		`
		if(index === 0){
			html += `<div class="card-deck mb-3 md:w-10">${curr}`
		}else if(index % 3 === 0 && index !== 0){
			html += `</div><div class="card-deck mb-3 md:w-10">${curr}`
		}else{
			html += curr
		}
	});
	productos.innerHTML = html;
}