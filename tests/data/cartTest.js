import { addToCart, cart, loadFromStorage, removeFromCart, updateDeliveryOption } from '../../data/cart.js'

const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId3 = '3ebe75dc-64d2-4137-8860-1f5a963e534b';

describe('test suite: addToCart', () => {
  let mockLocalStorage;

  afterEach(()=> {
    Object.defineProperty(window, 'localStorage', { value: null });
  });

  it('addToCart adds an existing product to the cart', ()=> {
    mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => {
        return JSON.stringify([{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 1,
            deliveryOptionId: '1'
          }])
        }),
      setItem: jasmine.createSpy('setItem')
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(2);
    //  16c
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
  });

  it('adds a new product to the cart', ()=> {
    mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => JSON.stringify([])),
      setItem: jasmine.createSpy('setItem')
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });

    loadFromStorage();

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
    //  16d
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify(      [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
  })
});

//  16i
describe('test suite: removeFromCart', ()=> {
  beforeEach(()=> {
    let mockLocalStorage;
    mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
        ]);
      }),
      setItem: jasmine.createSpy('setItem')
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    loadFromStorage();
  });

  it('removes a productId that is in the cart', ()=> {
    removeFromCart(productId1);

    expect(cart.length).toEqual(1);
    expect(cart).toEqual(
      [{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]
    )
  });

  it('removes a productId that is NOT in the cart', ()=> {
    removeFromCart(productId3);

    expect(cart.length).toEqual(2);
    expect(cart).toEqual([
      {
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
    ])
  });
});

describe('test suite: updateDeliveryOption', ()=> {
  beforeEach(()=> {
    document.querySelector('.js-test-container').innerHTML = 
    `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
    let mockLocalStorage;
    mockLocalStorage = {
      getItem: jasmine.createSpy('getItem').and.callFake(() => {
        return JSON.stringify([{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
        ]);
      }),
      setItem: jasmine.createSpy('setItem')
    };
    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
    loadFromStorage();
  });
  
  it('updates the delivery option of a product in the cart', ()=> {
    updateDeliveryOption(productId1, '3');
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(cart).toEqual(
      [{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '3'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }
      ]);
      expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      updateDeliveryOption(productId3, '1');
      expect(cart).toEqual(
        [{
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '3'
        }, {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '2'
        }
        ]
      );
  });
});