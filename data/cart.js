export let cart;

loadFromStorage();

/*
  Initialize cart.
  1. Generate the cart from localStorage.
  2. Else, populate cart array with hard-coded values. 
*/

export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [{
      productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionId: '1'
    }, {
      productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionId: '2'
    }
    ];
}
}

/*
  Save the cart to localStorage.
*/

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*
  Add item to cart based on productId. 
  1. If already in the cart, increase quantity.
  2. Else, push onto cart.
  3. Save to localStorage.
*/

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1,
      deliveryOptionId: '1'
    });
  }

  saveToStorage();
}

/*
  Remove item from the checkout cart.
  1. Creates a new cart that excludes the product ID passed.
  2. Save to localStorage.
*/

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem)=> {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}

/*
  Loop through cart and return total item quantity.
*/  

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem)=> {
    cartQuantity += cartItem.quantity;
  })
  return cartQuantity;
}

/*
  Update the quantity of an item already in the cart.

  1. If the product ID passed in function call.
  matches a product in the cart, increase product
  quantity by the new quantity passed in function call.
  2. Save to localStorage.
*/ 
 
export function updateCartQuantity(productId, newQuantity) {
  cart.forEach((cartItem)=> {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  })
  
  saveToStorage();
}

/*
  Update delivery option.
  1. Loop through the cart and find the product.
  2. Update the deliveryOptionId of that product.
  3. If productId is not in the cart, return.

*/

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if(matchingItem === undefined) {
    return;
  }

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}

export function loadCart(fun) {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', ()=> {
    console.log(xhr.response);
    fun();
  });

  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}


/*
  18h. in data/cart.js, create an async function loadCartFetch()
       and create an async await version of loadCart(). console.log()
       the text attached to the response. In scripts/checkout.js,
       inside loadPage(), replace loadCart() with loadCartFetch().
*/

export async function loadCartFetch() {
  const response = await fetch('https://supersimplebackend.dev/cart');

  const message = await response.text();

  console.log(message);
}