import { mainPage } from '../../../support/homePage';
import { product } from '../../../support/productPage';

const base = Cypress.env("baseUrl");
const username = Cypress.env("username")
const password = Cypress.env("password")


describe('Desafio 4', ()=>{

let data 

before('Fixture',()=>{
    cy.fixture('dataProduct').then(fixtureData => {
        data = fixtureData;  
      });
})
beforeEach('Should be logged in', ()=>{
    cy.login(username, password)
    cy.visit(base)    
})
it('Validate added products', ()=>{

  const totalPriceProd1=data.product1.totalPrice = data.product1.quantity * data.product1.productPrice
  const totalPriceProd2=data.product2.totalPrice = data.product2.quantity * data.product2.productPrice
  
  
  // productID Random number
  const randomID1 = product.generateRandomID()
  const randomID2 = product.generateRandomID()
  

  // Update value of productID
  data.product1.productID1 = randomID1.toString();
  data.product2.productID2 = randomID2.toString();

  cy.productPage()  

  // Create 2 products

  cy.deleteProduct(randomID1)
  cy.addProduct(
    data.product1.productName,
    data.product1.productImageUrl,
    data.product1.productID1,
    data.product1.productPrice,
    
  )

 cy.deleteProduct(randomID2)
 cy.addProduct(
      data.product2.productName,
      data.product2.productImageUrl,
      data.product2.productID2,
      data.product2.productPrice,
      
    );
  
  mainPage.clickOnlineShopLink()

  // Add created products to the shopping Cart

  product.add2Products(`${data.product1.productID1}`)
  product.add2Products(`${data.product2.productID2}`)
  product.clickShopCartBtn()
  
  cy.verifyShoppingCart(0, data.product1);
  cy.verifyShoppingCart(1, data.product2);

  // Verify Total Price

  cy.get('button').contains('Show total price').click()
  cy.get('#price > b').invoke('text').then(val=>{
    const actualPrice = parseFloat(val);
    const expectedPrice = parseFloat((totalPriceProd1 + totalPriceProd2).toFixed(1));  
    expect(actualPrice).to.eq(expectedPrice);
  })

  // Verify Billing Summary

  cy.getByDataCy('goBillingSummary').click()
  cy.verifyBillingSummary(data.product1, data.product2 )
  product.clickCheckoutBtn()
  product.fillBillingInfo(data.billing.firstName, data.billing.lastName, data.billing.cardNumber)
  cy.getByDataCy('purchase').click()

  // Verify Purchase
  cy.verifyPurchase({
    "name": "Maria Abdo", 
    [data.product1.productName]: data.product1.quantity + ' ' + 'x' + ' ' + data.product1.productName,
    [data.product2.productName]: data.product2.quantity + ' ' + 'x' + ' ' + data.product2.productName,
    "creditCard": data.billing.cardNumber,
    "totalPrice" : totalPriceProd1 + totalPriceProd2

  })

  // Validate the database

  cy.getByDataCy('sellId').invoke('text').then(sellId=>{
 
    const query = `SELECT id, product, quantity, total_price, price, sell_id FROM public."purchaseProducts" where sell_id =  ${sellId}`;

    cy.task("connectDB", query).then((result) => {
        const productPrice1 = parseFloat(data.product1.productPrice).toFixed(2);
        const productPrice2 = parseFloat(data.product2.productPrice).toFixed(2);
    
        
        const total_price1 = parseFloat(result[0].total_price).toFixed(2);
        const total_price2 = parseFloat(result[1].total_price).toFixed(2);
    
        expect(result[0]).to.contain({              
            product: data.product1.productName, 
            quantity: data.product1.quantity,
            sell_id: parseInt(sellId),
            price: productPrice1,
            total_price: total_price1
        });
    
        expect(result[1]).to.contain({     
            product: data.product2.productName, 
            quantity: data.product2.quantity,
            sell_id: parseInt(sellId),
            price: productPrice2,
            total_price: total_price2
        });
    });
  })})

})

