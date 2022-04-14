
//Array para carga de productos

class electrodomestico {
    constructor (marca, modelo, precio,){
    this.marca = marca;
    this.modelo = modelo;
    this.precio = parseFloat(precio);
    }

    addIva(){
        return this.precio * 1.21;
    }
}

let carrito = [];

function cargaDeProductos(){
do {
    let informacion = prompt ('ingrese la marca del producto o fin para finalizar la compra');
    if( informacion === "fin"){
        break;
    }else{
        marcaProducto = informacion;
        let modeloProducto = prompt (" ingrese el modelo");
        let precioProducto = parseInt(prompt (" ingrese el precio del producto"));
        carrito.push(new electrodomestico(marcaProducto, modeloProducto, precioProducto))
    }
}
while (carrito != "fin")

console.log(carrito);

for (var productofinal of carrito) {
console.log (productofinal.marca)
console.log (productofinal.modelo)
console.log (productofinal.addIva())
};
}

cargaDeProductos();

//Buscador de productos pre-cargados. Arroja un producto buscado pre-cargado y precio.

function buscador (){
var buscoProducto = prompt("Ingrese el producto que desea buscar")
var productoNombre = carrito.filter( productofinal => productofinal.marca.includes(buscoProducto))
console.log(productoNombre)


for( var productofinal of productoNombre ){
    alert("nombre  " + productofinal.marca)
    alert("Modelo  " + productofinal.modelo)
    alert ("precio  " + productofinal.addIva())
}

}

buscador();


// informa 3 o 6 cuotas según elija el cliente.

for ( var precioCuotas of productoNombre){
    let compra3cuotas = confirm("3 cuotas de: " + (productofinal.addIva() / 3))

    if(compra3cuotas === true){
        alert ("Felicitaciones por su compra")
        break;
    }else{
       let compra6cuotas = confirm("Tambien tenemos 6 cuotas de: " + (productofinal.addIva() / 6))

       if(compra6cuotas === true){
       alert ("Felicitaciones por su compra")
        break;
       }else{
           alert("Esperamos vuelva pronto!")
       }
    }
}







    

