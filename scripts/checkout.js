import { renderOrderSummary } from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProductsFetch } from '../data/products.js';
import { loadCartFetch } from '../data/cart.js'

async function loadPage() {
  try {

    /*
    await loadProductsFetch();

    const value = await new Promise((resolve, reject)=> {
      loadCartFetch(()=> {  //18h. replace loadCart() to loadCartFetch()
        resolve('value3');
      });
    });
    */

    /*
      18i.  In checkout.js, use Promise.all to run loadProductsFetch()
            and loadCartFetch() at the same time. Note: give the promises
            directly to Promise.all (don't await them, otherwise they'll 
            run one at a time). Then, use await Promise.all(...) to wait for 
            Promise.all to finish.
    */

    await Promise.all ([
      loadProductsFetch(),
      loadCartFetch()
    ])

  } catch (error) {
    console.log('Unexpected error. Please try again later: ' + error);
  }

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


