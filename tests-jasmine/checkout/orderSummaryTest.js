import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { cart, loadFromStorage } from '../../data/cart.js'

describe('test suite: renderOrderSummary', ()=> {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  //beforeEach HOOK - code to run before starting an it() function
  beforeEach(()=> {
    let mockLocalStorage;
    document.querySelector('.js-test-container').innerHTML = 
    `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `;
    
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
    renderOrderSummary();
  });

  

  it('displays the cart', ()=> {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');

    //clear all the HTML generated while testing 
    document.querySelector('.js-test-container').innerHTML = "";

    Object.defineProperty(window, 'localStorage', { value: null });
  });

  it('removes a product', ()=> {
    //Deletes a product via click
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    //'.not' does the opposite of what's next after it
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

    //clear all the HTML generated while testing 
    document.querySelector('.js-test-container').innerHTML = "";

    Object.defineProperty(window, 'localStorage', { value: null });
  });
});