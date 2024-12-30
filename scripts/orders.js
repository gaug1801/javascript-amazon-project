import { orders } from '../data/orders.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import formatCurrency from './utils/money.js';
import { getProduct, loadProductsFetch, products } from '../../data/products.js';


console.log(orders);
/*
  18l.  Finish the orders page. Create a new file scripts/orders.js
        for creatingthe orders page, and load it in orders.html.
        Using the array of orders in data/orders.js, generate the HTML
        for this page.
*/

loadPage();

async function loadPage() {
  await loadProductsFetch();
  
  let html = '';

  orders.forEach((order)=> {
    const dateString = dayjs(order.orderTime).format('MMMM D');
  
    html += `
          <div class="order-container">
            <div class="order-header">
              <div class="order-header-left-section">
                <div class="order-date">
                  <div class="order-header-label">Order Placed:</div>
                  <div>${dateString}</div>
                </div>
                <div class="order-total">
                  <div class="order-header-label">Total:</div>
                  <div>$${formatCurrency(order.totalCostCents)}</div>
                </div>
              </div>
  
              <div class="order-header-right-section">
                <div class="order-header-label">Order ID:</div>
                <div>${order.id}</div>
              </div>
            </div>
  
            <div class="order-details-grid js-order-details-grid">
              ${productsListHTML(order)}
            </div>
          </div>
    `;

    document.querySelector('.js-orders-grid').innerHTML = html;
  });
}

function productsListHTML(order) {
  
  let productHtml = '';

  order.products.forEach((product)=> {
    const matchingProduct = getProduct(product.productId);
    const arrivalDate = dayjs(product.estimatedDeliveryTime).format('MMMM D');

    productHtml += `
      <div class="product-image-container">
        <img src="${matchingProduct.image}">
      </div>

      <div class="product-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-delivery-date">
          Arriving on: ${arrivalDate}
        </div>
        <div class="product-quantity">
          Quantity: ${product.quantity}
        </div>
        <button class="buy-again-button button-primary">
          <img class="buy-again-icon" src="images/icons/buy-again.png">
          <span class="buy-again-message">Buy it again</span>
        </button>
      </div>

      <div class="product-actions">
        <a href="tracking.html">
          <button class="track-package-button button-secondary">
            Track package
          </button>
        </a>
      </div>
    `;
  });
  
  return productHtml;
}

