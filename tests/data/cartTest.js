import { addToCart, cart, loadFromStorage } from '../../data/cart.js'

describe('test suite: addToCart', () => {
  let mockLocalStorage;

  it('adds an existing product to the cart', ()=> {
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

    Object.defineProperty(window, 'localStorage', { value: null });
  });

  it('adds a new product to the cart', ()=> {
    // spyOn(localStorage, 'getItem').and.callFake(()=> {
    //   return JSON.stringify([]);
    // });
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
    Object.defineProperty(window, 'localStorage', { value: null });
  })
});