import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity, updateDeliveryOption } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js';

/*
  Generate cart quantity upon loading the webpage.
*/

document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;

/*
  Generate cart HTML with accumulator pattern.

  1. Iterate through cart.
  2. Match cart item ID with a protuct ID.
  3. Iterate through delivery options.
  4. Match cartItem delivery option ID.
  5. Initialize DayJS with current date.
  6. Generate HTML:
    - Call deliveryOptionsHTML(matchingProduct, cartItem).
    - Generate HTML.
    - Merge HTML.
*/

let cartSummaryHTML = '';

cart.forEach((cartItem)=> {
  const productId = cartItem.productId;

  let matchingProduct;
  products.forEach((product)=> {
    if (product.id === productId) { //this gives us access to all the properties of the item
      matchingProduct = product;
    }
    
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let  deliveryOption;

  deliveryOptions.forEach((option)=> {
    if (option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: ${dateString}
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingProduct.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          $${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id} js-quantity-label">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${matchingProduct.id}">
            Update
          </span>
          <input class="quantity-input js-quantity-input-${matchingProduct.id} js-quantity-input" data-product-id="${matchingProduct.id}">
          <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${matchingProduct.id}">Save</span>
          <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        ${deliveryOptionsHTML(matchingProduct, cartItem)}
      </div>
    </div>
  </div>
  `;
});

/*
  1. Loop through deliveryOptions.
  2. For each option, generate some HTML.
  3. Combine the HTML together.
*/

function deliveryOptionsHTML(matchingProduct, cartItem) {
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    //if the first part returns true, the value is whatever is after the question mark. 
    //If the first part is false, the value is whatever is after the colon.
    const priceString = deliveryOption.priceCents === 0 
    ? 'FREE'
    :`$${formatCurrency(deliveryOption.priceCents)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

    html += `
      <div class="delivery-option js-delivery-option"
      data-product-id="${matchingProduct.id}"
      data-delivery-option-id="${deliveryOption.id}">
        <input type="radio" 
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
    `;

  });

  return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

/*
  Add Event Listener for deleting an item from the cart.
*/

document.querySelectorAll('.js-delete-link').forEach((link)=> {
  link.addEventListener('click', () => {
    //Pull product ID from HTML data attribute.
    const productId = link.dataset.productId;
    removeFromCart(productId);

    //Calculate new cart quantity and pass to return home link.
    document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;

    //Remove the item from HTML.
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`);
    container.remove();
  });
});

/*
  Add Event Listener for each item's "Update" link.
 */

document.querySelectorAll('.js-update-quantity-link').forEach((link)=> {
  link.addEventListener('click', ()=> {
    //Pull product ID from HTML data attribute.
    let productId = link.dataset.productId;

    //Add the class 'is-editing-quantity' to item container.
    document.querySelector(`.js-cart-item-container-${productId}`).classList.add('is-editing-quantity');
  })
});

/*
  Add Event Listener for each "Save" link.
*/

document.querySelectorAll('.js-save-quantity-link').forEach((link)=> {
  link.addEventListener('click', ()=> {
    //Pull product ID from HTML data attribute.
    let productId = link.dataset.productId;
    handleItemQuantityChange(productId);
  });
});

/*
  Add Event Listener for each quantity input.

  Allows the user to press "Enter" to save the update.
*/

document.querySelectorAll('.js-quantity-input').forEach((link)=> {
  link.addEventListener('keydown', (event)=> {
    if (event.key === 'Enter') {
      let productId = link.dataset.productId;
      handleItemQuantityChange(productId);
    }
  });
});

/*
  Handles item quantity change.
  Takes product ID as argument.
*/

function handleItemQuantityChange(productId) {
  document.querySelector(`.js-cart-item-container-${productId}`).classList.remove(('is-editing-quantity'));
  //  Pull new quantity from HTML data attribute.
  let newQuantity = Number(document.querySelector(`.js-quantity-input-${productId}`).value);

  if (newQuantity >= 0 && newQuantity < 1000) {
    //  Update item quantity in cart.
    updateCartQuantity(productId, newQuantity);

    //  Update new item quantity on quantity label.
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML = newQuantity;

    //Calculate new cart quantity and pass to return home link.
    document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;
  } else {
    alert('Quantity must be at least 0 and less than 1000.');
  }
}

/*
  Add Event Listener for every delivery option radio button.
  Pass productId and deliveryOptionId using HTML data attribute.
  Call updateDeliveryOption and pass productId and deliveryOptionId.
*/

document.querySelectorAll('.js-delivery-option').forEach((element)=> {
  element.addEventListener('click', ()=> {
    //const productId = element.dataset.productId;
    //const deliveryOptionId = element.dataset.deliveryOptionId;
    const { productId, deliveryOptionId } = element.dataset;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});