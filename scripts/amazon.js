import {cart,addToCart,calculateCartQuantity} from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';

async function loadPage(){
  await loadProducts();
  loadContent();
}

loadPage();

function loadContent(){
let productHtml = '';
products.forEach((product)=>{
  productHtml += `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            ${product.getPrice()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          ${product.extraInfoHTML()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart-button " 
          data-product-Id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
});

document.querySelector('.js-products-grid').innerHTML = productHtml;
let intervalId;
function addedMessageFunc(productId, button){
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add('added-to-cart-show');

  if (intervalId) {
    clearTimeout(intervalId); // Clear any existing timeout to avoid multiple timeouts running.
  }

  intervalId = setTimeout(() => {
    addedMessage.classList.remove('added-to-cart-show');
  }, 2000);

  button.addEventListener('click', () => {
    if (intervalId) {
      clearTimeout(intervalId); // Clear the timeout if the button is clicked again within the 2 seconds.
    }

    intervalId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-show');
    }, 2000);
  });
}

document.querySelectorAll('.js-add-to-cart-button').forEach((button) => {
button.addEventListener('click',() => {
const {productId} = button.dataset;

const quantitySelector = document.querySelector(
  `.js-quantity-selector-${productId}`
);

addedMessageFunc(productId, button);
addToCart(productId,quantitySelector);

updateCartQuantity();
})
})

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity')
    .innerHTML = cartQuantity;
}

updateCartQuantity();
}