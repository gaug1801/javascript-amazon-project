import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js'

async function loadPage() {

  await loadProductsFetch();

  const value = await new Promise((resolve)=> {
    loadCart(()=> {
      resolve();
    });
  });

  renderOrderSummary();
  renderPaymentSummary();
}

loadPage();


/*
Promise.all([
  loadProductsFetch(), // returns a promise. no need to create a new one.
  new Promise((resolve)=> {
    //Second step. Wait for it to finish then call resolve.
    loadCart(()=> {
      resolve();
    });
  })

]).then((values)=> {
  console.log(values);
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve)=> {
  //  First step. Wait for it to finish then call resolve.
  loadProducts(()=> {
    resolve('value1');
  });

}).then((value)=> {
  console.log(value);
  return new Promise((resolve)=> {
    //Second step. Wait for it to finish then call resolve.
    loadCart(()=> {
      resolve();
    });
  });

}).then(()=> {
  //  Third step.
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// loadProducts(()=> {
//   loadCart(()=> {
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });


