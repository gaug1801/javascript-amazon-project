import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { getOrder, getProductDeliveryDate } from '../data/orders.js';
import { getProduct } from '../data/products.js';
import { loadProductsFetch } from '../data/products.js';

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId');
// console.log(productId);

renderProductTracking();

async function renderProductTracking() {
  await loadProductsFetch();

  let html = '';
  const order = getOrder(orderId);
  const product = getProduct(productId)
  console.log(order);
  console.log(product);
  console.log(getProductDeliveryDate(order, productId));

  const estimatedDeliveryTime = dayjs(getProductDeliveryDate(order, productId));
  const deliveryProgress = ((dayjs() - dayjs(order.orderTime)) / (dayjs(estimatedDeliveryTime) - dayjs(order.orderTime)) * 100);
  console.log(deliveryProgress);

  html += `
    <div class="order-tracking">
      <a class="back-to-orders-link link-primary" href="orders.html">
        View all orders
      </a>

      <div class="delivery-date">
        Arriving on ${estimatedDeliveryTime.format('MMMM D')}
      </div>

      <div class="product-info">
        ${product.name}
      </div>

      <div class="product-info">
        Quantity: 1
      </div>

      <img class="product-image" src="${product.image}">

      <div class="progress-labels-container">
        <div class="progress-label js-progress-label-1">
          Preparing
        </div>
        <div class="progress-label js-progress-label-2">
          Shipped
        </div>
        <div class="progress-label js-progress-label-3">
          Delivered
        </div>
      </div>

      <div class="progress-bar-container">
        <div class="progress-bar js-progress-bar" style="width: ${deliveryProgress}%;"></div>
      </div>
    </div>
  `;

  document.querySelector('.main').innerHTML = html;

  // document.querySelector('.js-progress-label-3').classList.add('current-status');
  renderDeliveryProgress(deliveryProgress);
}

function renderDeliveryProgress (deliveryProgress) {
  if (deliveryProgress > 0 && deliveryProgress < 49) {
    document.querySelector('.js-progress-label-1').classList.add('current-status');
    document.querySelector('.js-progress-label-2').classList.remove('current-status');
    document.querySelector('.js-progress-label-3').classList.remove('current-status');
  } else if (deliveryProgress > 49 && deliveryProgress < 99 ) {
    document.querySelector('.js-progress-label-1').classList.remove('current-status');
    document.querySelector('.js-progress-label-2').classList.add('current-status');
    document.querySelector('.js-progress-label-3').classList.remove('current-status');
  } else if (deliveryProgress > 99) {
    document.querySelector('.js-progress-label-1').classList.remove('current-status');
    document.querySelector('.js-progress-label-2').classList.remove('current-status');
    document.querySelector('.js-progress-label-3').classList.add('current-status');
  }
}


