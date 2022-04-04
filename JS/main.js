
let valor = 0;

let precio2 = 0;


function valorProducto(){

    let producto = prompt("que producto desea agregar? tv - celular - heladera");    

    if(producto == "tv") {
        valor += 30000
    }
    if(producto == "celular") {
        valor += 50000
    }
    if(producto == "heladera") {
        valor += 45000
    }

}

function sumaProductos(valor,precio2){
    let suma;
    suma = (valor) * 1.21;
    alert("sus productos tienen un valor final de " + suma + " mas IVA");
}

//llamamos funcion
valorProducto ();

alert("Su producto tiene un falor final de " + valor);

let otroProducto = confirm("desea agregar otro producto (Aceptar -Si- cancelar -NO-?)")

if (otroProducto == true){
   valorProducto();
}

//llamamos funcion de suma
sumaProductos(valor,precio2)



