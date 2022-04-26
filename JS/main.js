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
       <div class="shopping-cart-price d-flex align-items-center h-100 border-bottom pb-2 pt-3">
           <p class="item-price mb-0 shoppingCartItemPrice">${itemprecio}</p>
       </div>
   </div>
   <div class="col-4">
       <div
           class="shopping-cart-quantity d-flex justify-content-between align-items-center h-100 border-bottom pb-2 pt-2">
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

    //addLocalStorage()    

}

// DAMOS VIDA AL BOTON DE REMOVER PRODUCTO DEL CARRITO - TAMBIEN SE DESCUENTA SU VALOR DEL TOTAL -

function removerProductoDelCarrito(event){
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

//LocalStorage

/*
function addLocalStorage(){
    localStorage.setItem('shoppingCartItemsContainer', JSON.stringify(shoppingCartItemsContainer))
  }
  
  window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('shoppingCartItemsContainer'));
    if(storage){
        shoppingCartItemsContainer = storage;
      renderCarrito()
    }
  }*/

  //FILTRADO POR CATEGORIAS
  


    

