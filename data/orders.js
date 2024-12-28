export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(order) {
  orders.unshift(order); // adds the order to the front of the array instead of the back.
  saveToStorage(); 
}

function saveToStorage() {
  localStorage.setItem('orders', JSON.stringify(orders));
}