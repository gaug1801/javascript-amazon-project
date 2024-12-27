/* 
  Main Idea of JavaScript:
    1. Save the data
      - Data = information (about our products, in this case. eg. price, image, reviews)
    2. Generate the HTML
    3. Make it interactive 

  To represent the products on the website, we
  will store them in a list. 
  Each product has multiple properties:
    - name
    - image
    - price
    - reviews
  Thus, we save each product as an object.
  Below, this array of objects is called DATA STRUCTURE.
    We usually use a combination of objects and arrays to create data structures.

  Data Attribute:
    Used to pass information to from JavaScript to the HTML.
    To use it, we create an attribute that starts with 'data-',
    then any name can be assigned to it. Ex. data-product-name.
    It HAS to start with data- and must be in kebab-case.
    In this case, when generating the HTML, we pass into it
    the name of the product.
      - DOM Notes: Element.dataset returns ALL data attributes associated
      with the selected HTML element as an array of said objects
        - the data attribute name is converted from kebab-case to camelCase
        at this point.
        - Thus, to access the data, we use 'Element.dataset.objectName'
        - Ex. button.dataset.productName

  Main Idea of Modules:
    Getting a variable out of a file
     1. add 'type="module"' attribute to <script> tag
      - This allows the selected file to import variables from other files.
     2. go to the file you want to export from.
      - add "export" in front of the var declaration
    3. go to the file that will be importing
      - import {var} from 'filepath';
    Example:
      import {cart} from '../data/cart.js';
      - '..' = represents the folder outside the current folder. so, go outside the current folder (in this case, javascript-amazon-project is where this leads)
      - '/' = go outside of the scripts folder
      - data/ = go into data folder
      - "./" represents the current folder.

  Chapter 14 Modules Notes:
  - Imports must go at the top of the file
  - In this course, you need to be running Live Server
    - Modules don't work if you open an HTML directly
  Why is this useful:
    1. Avoids naming conflicts
      - They will only happen when we import a variable name.
      - You can rename the imported variable in the import
        - Example: import {cart as myCart} from '../data/cart.js';
      - You can group all the variables within a file into one object
        - Example: import * as cartModule from '../data/cart.js';
          cartModule.cart
          cartModule.addToCart('id)
    2. Don't have to worry about order of files
      - We can just import the variables that we need and not worry about the order in which we load our files.
    
*/

import { addToCart,calculateCartQuantity } from '../data/cart.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';


loadProducts(renderProductsGrid);

/*
  Update cart quantity upon loading the web page.
*/

document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

/*
  Generate HTML using accumulator pattern.
*/

function renderProductsGrid() {
  let productsHTML = '';

  products.forEach( (product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src="${product.getStarsUrl()}">
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        ${product.extraInfoHTML()}

        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart" 
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
  });


  document.querySelector('.products-grid')
  .innerHTML = productsHTML;

  /*
    Event Listener for adding an item to the cart.

    1. Pass the product name to the "Add to Cart" button.
    2. Retrieve the name using dataset.
    3. Add it to the cart .
    4. Calculate new cart quantity.
    5. Pass new cart quantity to HTML.
  */

  document.querySelectorAll('.js-add-to-cart')
  .forEach((button) => {
    button.addEventListener('click', ()=> {
      const productId = button.dataset.productId;
      
      addToCart(productId);
      
      document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();
    });
  });
}