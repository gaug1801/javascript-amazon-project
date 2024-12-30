import { renderOrderSummary } from '../../scripts/checkout/orderSummary.js';
import { cart, loadFromStorage } from '../../data/cart.js'
import { loadProducts, loadProductsFetch } from '../../data/products.js';

describe('test suite: renderOrderSummary', ()=> {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  beforeAll(async ()=> {
    /*
      18j.  in orderSummaryTest.js, in the beforeAll hook, instead of
            using a done function, make the inner function async and use 
            await to wait for loadProductsFetch() to finish.
    */
    await loadProductsFetch();
    /*
      //  this is not waiting for the response. .then(() => done()) Takes care of that.
      loadProductsFetch().then(() => {
        done();
      })
    */


  });

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

  afterEach(()=> {
    //Clear all HTML generated while testing from the browser window.
    document.querySelector('.js-test-container').innerHTML = "";
    Object.defineProperty(window, 'localStorage', { value: null });
  });

  it('displays the cart', ()=> {
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
    expect(document.querySelector(`.js-product-quantity-${productId1}`).innerText).toContain('Quantity: 2');
    expect(document.querySelector(`.js-product-quantity-${productId2}`).innerText).toContain('Quantity: 1');
    //16g
    expect(document.querySelector(`.js-product-name-${productId1}`).innerText).toEqual('Black and Gray Athletic Cotton Socks - 6 Pairs');
    //16h
    expect(document.querySelector(`.js-product-price-${productId1}`).innerText).toEqual('$10.90');
  });

  it('removes a product', ()=> {
    //  Click the "Delete" button.
    document.querySelector(`.js-delete-link-${productId1}`).click();
    expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(1);
    expect(document.querySelector(`.js-cart-item-container-${productId1}`)).toEqual(null);
    //  '.not' does the opposite of what's next after it
    expect(document.querySelector(`.js-cart-item-container-${productId2}`)).not.toEqual();
    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);
    //  16g
    expect(document.querySelector(`.js-product-name-${productId2}`).innerText).toEqual('Intermediate Size Basketball');
    //  16h
    expect(document.querySelector(`.js-product-price-${productId2}`).innerText).toEqual('$20.95');
  });

  
  it('updates the delivery option', ()=> {
    document.querySelector(`.js-delivery-option-${productId1}-3`).click();
    expect(document.querySelector(`.js-input-delivery-option-${productId1}-3`).checked).toEqual(true);
    expect(document.querySelector(`.js-input-delivery-option-${productId2}-2`).checked).toEqual(true);
    expect(cart.length).toEqual(2);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].deliveryOptionId).toEqual('3');
    expect(document.querySelector('.js-payment-summary-money').innerText).toContain('$14.98');
    expect(document.querySelector('.js-payment-summary-money-total').innerText).toContain('$63.50');
  });
});