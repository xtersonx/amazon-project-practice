import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
//import '../data/cart-class.js';
import '../data/car.js';
import { loadProducts } from "../data/products.js";

/*
Promise.all([
  loadProducts()
]).then(() => {
  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
});
*/


async function loadPage(){
  try{
    await loadProducts();
  }
  catch(error){
    alert('Unexpected error. Please try again later. ');
    console.log(error);
  }

  renderOrderSummary();
  renderPaymentSummary();
  renderCheckoutHeader();
}
loadPage();