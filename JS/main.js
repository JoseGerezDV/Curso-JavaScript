const botonAgregarAlCarritoCompras = document.querySelectorAll('.addToCart');
botonAgregarAlCarritoCompras.forEach(botonAgregarProducto =>{
    botonAgregarProducto.addEventListener('click', agregarAlCarritoClicked);
});

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

        subirTotalCarrito();
  
}

function subirTotalCarrito(){
    let total = 0;
    const shoppingCartTotal = document.querySelector('.shoppingCartTotal');

    const shoppingCartItems = document.querySelectorAll('.shoppingCartItem');

    shoppingCartItems.forEach((shoppingCartItem) => { 
        const shoppingCartItemsPriceElement = shoppingCartItem.querySelector('.shoppingCartItemPrice');

        const shoppingCartItemPrice = Number(shoppingCartItemsPriceElement.textContent.replace('$',''));
          
        const shoppingCartItemQuantityElement = shoppingCartItem.querySelector('.shoppingCartItemQuantity');

        const shoppingCartItemQuantity = Number(shoppingCartItemQuantityElement.value);

        total = total + shoppingCartItemPrice * shoppingCartItemQuantity;
    });

    shoppingCartTotal.innerHTML = `$ ${total}`;

}



    

