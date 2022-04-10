
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
}


