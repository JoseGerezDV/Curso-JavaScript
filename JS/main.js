class Carrito{

            //añadir al carrito

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto)
            
        }
    }

    leerDatosProducto(producto){
        const infoProducto = {
            imagen : producto.querySelector('img').src,
            titulo : producto.querySelector('.item-title').textContent,
            precio : producto.querySelector('.precio').textContent,
            id : producto.querySelector('a').getAttribute('data-id'),
            cantidad : 1
        }
        this.insertarCarrito(infoProducto);
    }

    insertarCarrito(producto){
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>

        `;

        listaProductos.appendChild(row)
        this.guardarProductosLocalStorage(producto);
    }

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoID = producto.querySelector('a').getAttribute('data-id');
        }
        this.eliminarProductoLocalStorage(productoID);
        this.calcularTotal();
    }

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild)
        }
        this.vaciarLocalStorage();
        return false;
    }

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos',JSON.stringify(productos));        
    }

    obtenerProductosLocalStorage(){
        let productoLS;

    (localStorage.getItem('productos') === null) ? productoLS = [] : productoLS = JSON.parse(localStorage.getItem('productos')); return productoLS;

    }

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(productoLS, index){
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            }
        });

        localStorage.setItem('productos', JSON.stringify(productosLS));
    }

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function(producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
                </td>

                `;

            listaProductos.appendChild(row);
        });
    }

    //Productos LocalStorage pestaña Compras

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach(function (producto){
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>
                    <img src="${producto.imagen}" width=100>
                </td>
                <td>${producto.titulo}</td>
                <td>${producto.precio}</td>
                <td>
                    ${producto.cantidad}
                </td>
                <td id='subtotales'>${producto.precio * producto.cantidad}</td>
                <td>
                    <a href="#" class="borrar-producto fas fa-times-circle" style="font-size:30px" data-id="${producto.id}"></a>
                </td>
            `;
            listaCompra.appendChild(row);
        });
    }


    vaciarLocalStorage(){
        localStorage.clear();
    }

    procesarPedido(e){
        e.preventDefault();
        (this.obtenerProductosLocalStorage().length === 0) ? swal("Atención!", "No hay ningun producto en el carrito!", "warning") : location.href = "compra.html";

    }

    calcularTotal(){
        let productoLS;
        let total = 0, subtotal = 0, iva = 0
        productoLS = this. obtenerProductosLocalStorage();
        for(let i = 0; i < productoLS.length; i++){
            let element = Number(productoLS[i].precio * productoLS[i].cantidad);
            total = total + element;
        }

        iva = parseFloat(total * 0.21).toFixed(2);
        subtotal = parseFloat(total - iva).toFixed(2);

        document.getElementById('subtotal').innerHTML = "$" + subtotal;
        document.getElementById('iva').innerHTML = "$" + iva;
        document.getElementById('total').innerHTML = "$" + total.toFixed(2);

    }

}



                // --------------------------------------//
                // --------------------------------------//
                // ------- Filtro por categorías --------//
                // --------------------------------------//
                // --------------------------------------//

                

    $(document).ready(function(){

        $('.category_item').click(function(){
        let catProduct = $(this).attr('category');
    
        $('.product_item').hide();
    
        $('.product_item[category="'+catProduct+'"]').show();
    
        });   
        
        $('.category_item[category="todo"]').click(function(){
            $('.product_item').show();
        })
    
      });

                // ---------------------------------------------//
                // ---------------- FILTRO POR -----------------//
                // ---------------- RANGO DE  ------------------//
                // ---------------- PRECIO  --------------------//
                // ---------------------------------------------//

    let aside = $(`
            <aside class="col-md-2 d-flex flex-column">
            </aside>
        `
    );

    let rangoDePrecio = $(`
    <hr>
    <p>Rango de precio</p>
    <form onsubmit="return false" class="precioRange d-flex flex-column">
        <label for="rangeSlider_inversed">Mínimo:</label>
        <input id="rangeSlider_inversed" type="range" min="50000" max="100000" value="50000"></input>
        <output>50000</output>
        <label for="rangeSlider">Máximo:</label>
        <input id="rangeSlider" type="range" min="70000" max="350000" value="70000"></input>
        <output>70000</output>
        <input class="btn btn-primary" type="submit" value="Aplicar">
    </div>
    `);


    $('aside').append(rangoDePrecio)
    $('aside').on('submit', 'form.precioRange', (e) => {
        let precioValorMayor = e.target[2].value
        let precioValorMenor = e.target[0].value
        
        for (const producto of $('.unProducto')) {
            
            let precioEnProducto = $(producto).children('div')[0].lastElementChild.innerHTML

            if (parseInt(precioEnProducto) > parseInt(precioValorMenor) && parseInt(precioEnProducto) < parseInt(precioValorMayor)) {

            } else {
                producto.remove()
            }

        }
    });

    $('aside').on('input', '#rangeSlider', (e) => {
        e.target.nextElementSibling.value = e.target.value
    }); 
    $('aside').on('input', '#rangeSlider_inversed', (e) => {
        e.target.nextElementSibling.value = e.target.value
    }); 


