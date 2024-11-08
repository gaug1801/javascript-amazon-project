import {cart, removeFromCart, calculateCartQuantity, updateCartQuantity } from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

/*
  Generate cart quantity upon loading the webpage.
*/

document.querySelector('.js-return-to-home-link').innerHTML = `${calculateCartQuantity()} items`;

/*
  Generate cart HTML with accumulator pattern.
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

  cartSummaryHTML += `
      <div class="cart-item-container 
        js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Wednesday, June 15
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

        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" checked class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio" class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `;
});

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
