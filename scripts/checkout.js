import { cart, removeFromCart, calculateCartQuantity, updateQuantity} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

let cartHtml ='';
let matchingProduct;
cart.forEach((item)=>{
  const productId = item.productId;
  products.forEach((product)=>{
    if(productId === product.id){
      matchingProduct = product;
    }
    })
    cartHtml = 
    cartHtml+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: Tuesday, June 21
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image"
              src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                $${formatCurrency(matchingProduct.priceCents)}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${item.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id="${matchingProduct.id}">
                  Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">
                Save
                  </span>
                <span class="delete-quantity-link link-primary js-delete-quantity-link" data-item-id="${productId}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
              <div class="delivery-option">
                <input type="radio" checked
                  class="delivery-option-input"
                  name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Tuesday, June 21
                  </div>
                  <div class="delivery-option-price">
                    FREE Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Wednesday, June 15
                  </div>
                  <div class="delivery-option-price">
                    $4.99 - Shipping
                  </div>
                </div>
              </div>
              <div class="delivery-option">
                <input type="radio"
                  class="delivery-option-input"
                  name="delivery-option-${productId}">
                <div>
                  <div class="delivery-option-date">
                    Monday, June 13
                  </div>
                  <div class="delivery-option-price">
                    $9.99 - Shipping
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
})

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-return-to-home-link')
    .innerHTML = `${cartQuantity} items`;
}

function isDecimal(num) {
  return num % 1 !== 0;
}


document.querySelector('.order-summary').innerHTML = cartHtml;

document.querySelectorAll('.js-delete-quantity-link').forEach((link)=>{
  link.addEventListener('click',()=>{
    const itemId = link.dataset.itemId;
    removeFromCart(itemId);
    document.querySelector(`.js-cart-item-container-${itemId}`).remove();
    updateCartQuantity();
  })
  
})

updateCartQuantity();



document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.add('is-editing-quantity');
    });
  });

  document.querySelectorAll('.js-save-link').forEach((link) => {
    const handleSave = () => {
      const productId = link.dataset.productId;
      const newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);
  
      if (newQuantity <= 0 || newQuantity >= 1000 || isDecimal(newQuantity) ) {
        alert('Quantity must be at least 1 and less than 1000');
        return;
      }
  
      updateQuantity(productId, newQuantity);
      updateCartQuantity();
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;
  
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');
    };
  
    // Handle click on the save link
    link.addEventListener('click', handleSave);
   
    // Add keydown event listener to the quantity input field to handle Enter key
    const inputField = document.querySelector(`.js-quantity-input-${link.dataset.productId}`);
    inputField.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        handleSave();
      }
    });
  });
  