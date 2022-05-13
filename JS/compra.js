const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');
const cliente = document.getElementById('cliente');
const correo = document.getElementById('correo');

cargarEventos();

function cargarEventos() {
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e)=>{compra.eliminarProducto(e)});
    
    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);

}

function procesarCompra(e) {
    e.preventDefault();

    if(compra.obtenerProductosLocalStorage().length === 0){
        swal("Atención!", "No hay procutos, seleccione alguno", "warning").then(function(){
            window.location = "index.html";
        })
    } else if(cliente.value === '' || correo.value === ''){
        swal("Atención!", "Por favor ingresar todos los campos requeridos", "warning")
    } else{

        const finCompraSub = document.querySelector('.subTotalCompra')
        finCompraSub.style.display = 'none'
        const finIva = document.querySelector('.ivaCompra')
        finIva.style.display = 'none'
        
        const cargandoGif = document.querySelector('#cargando')
        cargandoGif.style.display = 'block';

        const enviado = document.createElement('img');
        enviado.src = 'imagenes/mail.gif';
        enviado.id = 'enviadoFin';
        enviado.style.display = "block";

        setTimeout(()=>{
            cargandoGif.style.display = 'none';
            document.querySelector('#loaders').appendChild(enviado);
            setTimeout(()=> {
                swal("GENIAL!", "Muchas gracias por su compra, esperamos vuelva pronto", "success")
                setTimeout(()=> {
                    enviado.remove();
                    compra.vaciarLocalStorage();
                    window.location = "index.html";
                },3000);
            },2000)            
        }, 3000);
       
    }
}


      
    


