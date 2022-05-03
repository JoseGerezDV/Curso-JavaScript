const botonAgregarAlCarritoCompras = document.querySelectorAll('.addToCart');
botonAgregarAlCarritoCompras.forEach(botonAgregarProducto =>{
    botonAgregarProducto.addEventListener('click', agregarAlCarritoClicked);
});

const comprarButton = document.querySelector('.comprarButton');
comprarButton.addEventListener('click', comprarButtonclicked);

const shoppingCartItemsContainer = document.querySelector('.shoppingCartItemsContainer');

function agregarAlCarritoClicked(event) {
   const button = event.target;
   const unProducto = button.closest('.unProducto');
   const itemTitle = unProducto.querySelector('.item-title').textContent;
   const itemprecio = unProducto.querySelector('.precio').textContent;
   const itemimagen = unProducto.querySelector('.imgResponsive').src;


   agregarProductosAlCarrito(itemTitle,itemprecio,itemimagen)
  
}

function agregarProductosAlCarrito (itemTitle,itemprecio,itemimagen){

    const alert = document.querySelector('.alert')    
    setTimeout(function(){
        alert.classList.add('hide')
    },2000)
    alert.classList.remove('hide')

   const productoCarritoRow =  document.createElement('div');
   const contenidoCarrito =    ` 
   <div class="row shoppingCartItem">
   <div class="col-6">
       <div class="shopping-cart-item d-flex align-items-center h-100 border-bottom pb-2 pt-1">
           <img src=${itemimagen} class="shopping-cart-image">
           <h6 class="shopping-cart-item-title shoppingCartItemTitle text-truncate p-2">${itemTitle}</h6>
       </div>
   </div>
   <div class="col-2">
       <div class="shopping-cart-price h-100 border-bottom pb-2 pt-3">
           <p class="item-price mb-0 shoppingCartItemPrice">${itemprecio}</p>
       </div>
   </div>
   <div class="col-4">
       <div
           class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2">
           <input class="shopping-cart-quantity-input shoppingCartItemQuantity" type="number"
               value="1">
           <button class="btn btn-danger buttonDelete" type="button">X</button>
       </div>
   </div>
</div>`;

        productoCarritoRow.innerHTML = contenidoCarrito
        shoppingCartItemsContainer.append(productoCarritoRow);

        productoCarritoRow.querySelector('.buttonDelete').addEventListener('click',removerProductoDelCarrito);

        productoCarritoRow.querySelector('.shoppingCartItemQuantity').addEventListener('change', quantityChanged);

        subirTotalCarrito();

           
}


        

//FUNCION TOTAL CARRITO -  SUMA DE TODOS LOS PRODUCTOS -

function subirTotalCarrito(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => { 
        const shoppingCartItemsPriceElementos = shoppingCartItem.querySelector('.shoppingCartItemPrice');

        const shoppingCartItemPrice = Number(shoppingCartItemsPriceElementos.textContent.replace('$',''));
          
        const elementosShoppingCartItemQuantity = shoppingCartItem.querySelector('.shoppingCartItemQuantity');

        const shoppingCartItemQuantity = Number(elementosShoppingCartItemQuantity.value);

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });

    shoppingCartTotal.innerHTML = `$ ${total}`;

    //LOCAL STORAGE
    addLocalStorage()    
    //LOCAL STORAGE
    
}

// DAMOS VIDA AL BOTON DE REMOVER PRODUCTO DEL CARRITO - TAMBIEN SE DESCUENTA SU VALOR DEL TOTAL -

function removerProductoDelCarrito(event){

    const alert = document.querySelector('.remove')    
    setTimeout(function(){
        alert.classList.add('remove')
    },2000)
    alert.classList.remove('remove')

    const borrarArticulo = event.target;
    borrarArticulo.closest('.shoppingCartItem').remove();
    subirTotalCarrito();
}

// SE LE DA UTILIDAD AL INPUT NUMBER - SI DEJAR QUE EL CLIENTE INGRESE NUMEROS NEGATIVOS TAMBIEN LA CANTIDAD INFLUYE EN EL VALOR TOTAL DEL CARRITO

function quantityChanged(event){
   const input = event.target;
   if(input.value <= 0){
       input.value = 1;
   }
   subirTotalCarrito();
}

function comprarButtonclicked(){
    shoppingCartItemsContainer.innerHTML = '';
    subirTotalCarrito();
}

                // --------------------------------------//
                // --------------------------------------//
                // ----------- LOCAL STORAGE ------------//
                // --------------------------------------//
                // --------------------------------------//


    function addLocalStorage(){
        localStorage.setItem('shoppingCartItemsContainer', JSON.stringify(shoppingCartItemsContainer))
    
    
    window.onload = function(){
        const storage = JSON.parse(localStorage.getItem('shoppingCartItemsContainer'));
        if(storage){
            shoppingCartItemsContainer = storage;
            agregarProductosAlCarrito(itemTitle,itemprecio,itemimagen);
        }
    }
}


                // --------------------------------------//
                // --------------------------------------//
                // ---------------- BUSCADOR ------------//
                // --------------------------------------//
                // --------------------------------------//
  
  document.addEventListener("keyup", e=>{

    if (e.target.matches("#barrabusqueda")){
  
        if (e.key ==="Escape")e.target.value = ""
  
        document.querySelectorAll(".item-title").forEach(electro =>{
  
            electro.textContent.toLowerCase().includes(e.target.value.toLowerCase())
              ?electro.classList.remove("filtro")
              :electro.classList.add("filtro")
        })
  
    }  
  
  })

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

    

