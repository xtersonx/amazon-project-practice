import {cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

describe('test suite: addToCart', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
  });

  it('adds an existing product to the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    })

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {value: 1});
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    }]));

  });

  it('add new product to the cart', ()=>{
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([]);
    })

    loadFromStorage();
    
    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', {value: 1});
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 1,
      deliveryOptionId: '1'
    }]));
  });

});

describe('Test Suite: removeFromCart',()=>{
  
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
      ])
    });
    loadFromStorage();
});

    it('remove a product from the cart',()=>{
      removeFromCart(productId1);
      expect(cart.length).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]));
      
    });

    it('remove a product that is not in the cart',()=>{
      removeFromCart('does-not-exist');
      expect(cart.length).toEqual(2);
      expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      expect(localStorage.setItem).toHaveBeenCalledWith('cart',JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      },
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]));
    });
  
});

describe('Test Suite: updateDeliveryOpton', ()=>{
  beforeEach(()=>{
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(()=>{
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryOptionId: '1'
        },
      ])
    });
    loadFromStorage();
  });

  it('update delivery option of a product in the cart',()=>{
    updateDeliveryOption(productId1, '2');
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('2');
    expect(cart[0].quantity).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
      productId: productId1,
      quantity: 1,
      deliveryOptionId: '2'
    },]));
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });

  it('does nothing if the product is not in the cart', () => {
    loadFromStorage();

    updateDeliveryOption('does-not-exist', '3');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

  it('does nothing if the delivery option does not exist', () => {
    loadFromStorage();

    updateDeliveryOption('e43638ce-6aa0-4b85-b27f-e1d07eb678c6', 'does-not-exist');
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    expect(cart[0].deliveryOptionId).toEqual('1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);
  });

});