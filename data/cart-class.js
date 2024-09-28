class Cart {
  cartItems;
  localStorageKey;

  constructor(localStorageKey) {
    this.localStorageKey = localStorageKey;
    this.loadFromStorage();
  }

  loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`${this.localStorageKey}`)) || [
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
  };

  addToCart(productId, quantitySelector) {
    let isFound = false;
  
    // Update the quantity if the product is already in the cart
    this.cartItems.forEach(item => {
      if (productId === item.productId) {
        item.quantity += Number(quantitySelector.value);
        isFound = true;
      }
    });
  
    // If the product is not found, add it to the cart
    if (!isFound) {
      this.cartItems.push({
        productId,
        quantity: Number(quantitySelector.value),
        deliveryOptionId: '1'
      });
    }
    this.saveToStorage();
  };

  removeFromCart(itemId) {
    const newCart=[];
    this.cartItems.forEach((cartItem)=>{
      if(cartItem.productId !== itemId){
        newCart.push(cartItem);
      }
    })
  
    this.cartItems = newCart;
    this.saveToStorage();
  };
  
  saveToStorage() {
    localStorage.setItem(`${this.localStorageKey}`,JSON.stringify(this.cartItems));
  };

  calculateCartQuantity(){
    let cartQuantity = 0;
  this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
  };

  updateQuantity(productId, newQuantity) {
    const matchingItem = this.cartItems.find(cartItem => productId === cartItem.productId);
  
    if (matchingItem) {
      matchingItem.quantity = newQuantity;
      this.saveToStorage();
    }
  };

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem
    this.cartItems.forEach((cartItem)=>{
      if(productId === cartItem.productId){
        matchingItem = cartItem;
      }
    })
    if(!matchingItem || !validDeliveryOption(deliveryOptionId)){
      return
    }
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  };

};
const cart = new Cart('cart-class');
const businessCart = new Cart('businessCart-class');

cart.addToCart('83d4ca15-0f35-48f5-b7a3-1ea210004f2e', {value:1});

console.log(cart);
console.log(businessCart);
console.log(businessCart instanceof Cart);