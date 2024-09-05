export let cart =JSON.parse(localStorage.getItem('cart')) || [
  {
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 1
  },
  {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
  }
];

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
      quantity: Number(quantitySelector.value)
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