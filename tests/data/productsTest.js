import { Product, Clothing, Appliance, products } from '../../data/products.js';

describe('test suite: Product', ()=> {
  it('constructs an object', ()=> {
    let product = new Product(products[0]);
    
    expect(product.id).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(product.getPrice()).toEqual('$10.90');
    expect(product.extraInfoHTML()).toEqual(``);
  })
})


describe('test suite: Clothing', ()=> {
  it('constructs and object', ()=>{
    let clothing = new Clothing(products[2]);

    expect(clothing.id).toEqual('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
    expect(clothing.getPrice()).toEqual('$7.99');
    expect(clothing.extraInfoHTML()).toContain(`
      <a href="${clothing.sizeChartLink}" target="_blank">
        Size Chart
      </a>`);
  });
})

describe('test suite: Appliance', ()=> {
  it('constructs an object', ()=> {
    let appliance = new Appliance(products[3]);
    console.log(appliance);
    
    expect(appliance.id).toEqual('54e0eccd-8f36-462b-b68a-8182611d9add');
    expect(appliance.getPrice()).toEqual('$18.99');
    expect(appliance.type).toEqual('appliance');
    expect(appliance.instructionsLink).toEqual('images/appliance-instructions.png');
    expect(appliance.extraInfoHTML()).toContain(`
      <a href="${appliance.instructionsLink}" target="_blank">Instructions</a>
      <a href="${appliance.warrantyLink}" target="_blank">Warranty</a>
    `);
  });
})