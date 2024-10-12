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
*/

let productsHTML = '';
//This is known as accumulator pattern
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
          src="images/ratings/rating-${product.rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
          ${product.rating.count}
        </div>
      </div>

      <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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

      <div class="product-spacer"></div>

      <div class="added-to-cart">
        <img src="images/icons/checkmark.png">
        Added
      </div>

      <button class="add-to-cart-button button-primary">
        Add to Cart
      </button>
    </div>
  `;
});

console.log(productsHTML);

document.querySelector('.products-grid')
.innerHTML = productsHTML;