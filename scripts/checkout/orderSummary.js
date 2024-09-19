import { cart, removeFromCart, calculateCartQuantity, updateQuantity, updateDeliveryOption} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOption.js";
import { renderPaymentSummary } from "./paymentSummary.js";

export function renderOrderSummary() {

  let cartHtml ='';
  
  cart.forEach((item)=>{
  const productId = item.productId;
  const matchingProduct = getProduct(productId);


    const deliveryOptionId = item.deliveryOptionId;

    let deliveryOption = getDeliveryOption(deliveryOptionId);


    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    cartHtml+=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
            Delivery date: ${dateString};
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
              ${deliveryOptionHtml(productId, item)}
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
    renderPaymentSummary();
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
      renderPaymentSummary();
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
  
function deliveryOptionHtml(productId, cartItem) {
  let html = ``;
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryTime, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `${formatCurrency(deliveryOption.priceCents)} -`;
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

     html += `
      <div class="delivery-option js-delivery-option" 
       data-product-id="${productId}"
       data-delivery-option-id="${deliveryOption.id}"
       >
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input "
          name="delivery-option-${productId}"
          >
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
  `;
  })
  return html;
};

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click',()=>{
      const {productId, deliveryOptionId} = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
     console.log(cart);
     renderOrderSummary();
     renderPaymentSummary();
    })
  })

}