export const cart = [];
//With export in front, this var can now be imported

export function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem)=> {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  //I hadn't given thought to checking if it exists. This is a good way to resolve
  if (matchingItem) {
    matchingItem.quantity++;
  } else {
    cart.push({
      productId: productId,
      quantity: 1
    });
  }
}