export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // adds the order to the front of the array instead of the back.
  saveToStorage(); 
}

export function getOrder(orderId) {
  let order;
  orders.forEach((matchingOrder)=> {
    if (matchingOrder.id === orderId) {
      order = matchingOrder;
    }
  })
  return order;
}

export function getProductDeliveryDate(order, productId) {
  let currOrder = getOrder(order.id);
  let resultProduct;
  currOrder.products.forEach((matchingProduct)=> {
    if (matchingProduct.productId === productId) {
      resultProduct = matchingProduct;
    }
  })
  console.log(resultProduct.estimatedDeliveryTime);
  return resultProduct.estimatedDeliveryTime;
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}