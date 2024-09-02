export const cart = [];

export function addToCart(productId,quantitySelector){
  let isfound;
  cart.forEach(item=>{
  if(productId === item.productId){
    item.quantity+=Number(quantitySelector.value);
    isfound = true;
  }
});
if(!isfound){
  cart.push({
  productId,
  quantity: Number(quantitySelector.value)
});
console.log(cart);

};
}