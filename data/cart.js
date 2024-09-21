export let cart;

loadFromStorage();

export function loadFromStorage() {
  cart =JSON.parse(localStorage.getItem('cart')) || [
    {
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    },
    {
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }
  ];
}

export function addToCart(productId, quantitySelector) {
  let isFound = false;

  // Update the quantity if the product is already in the cart
  cart.forEach(item => {
    if (productId === item.productId) {
      item.quantity += Number(quantitySelector.value);
      isFound = true;
    }
  });

  // If the product is not found, add it to the cart
  if (!isFound) {
    cart.push({
      productId,
      quantity: Number(quantitySelector.value),
      deliveryOptionId: '1'
    });
  }
  saveToStorage();
}


export function removeFromCart(itemId) {
  const newCart=[];
  cart.forEach((cartItem)=>{
    if(cartItem.productId !== itemId){
      newCart.push(cartItem);
    }
  })

  cart = newCart;
  saveToStorage();
}

function saveToStorage() {
  localStorage.setItem('cart',JSON.stringify(cart));
}

export function calculateCartQuantity(){
  let cartQuantity = 0;
cart.forEach((cartItem) => {
  cartQuantity += cartItem.quantity;
});
return cartQuantity;
}

export function updateQuantity(productId, newQuantity) {
  const matchingItem = cart.find(cartItem => productId === cartItem.productId);

  if (matchingItem) {
    matchingItem.quantity = newQuantity;
    saveToStorage();
  }
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem
  cart.forEach((cartItem)=>{
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  })
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}