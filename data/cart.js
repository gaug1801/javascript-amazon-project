/*
  Initialize cart.

  Generate the cart from localStorage.
  Else, populate cart array with 
  hard-coded products. 
*/

export let cart = JSON.parse(localStorage.getItem('cart'));

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

/*
  localStorage function call to save the cart.
*/

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/*
  Add item to cart based on product ID. 
  
  If already in the cart, increase quantity.
  Else, push onto cart.
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
  
  Creates a new cart that excludes the
  product ID passed.
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
  Loop through cart and get total item quantity.
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

  If the product ID passed in function call.
  matches a product in the cart, increase product.
  quantity by the new quantity passed in function call.
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

*/

export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionId = deliveryOptionId;

  saveToStorage();
}