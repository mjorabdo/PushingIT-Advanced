import { mainPage } from '../../../support/homePage';
import { product } from '../../../support/productPage';

const base = Cypress.env("baseUrl");
const username = Cypress.env("username")
const password = Cypress.env("password")


describe('', ()=>{

let data 

before('Fixture',()=>{
    cy.fixture('dataProduct').then(fixtureData => {
        data = fixtureData;  
      });
})
beforeEach('', ()=>{
    cy.login(username, password)
    cy.visit(base)    
})
it('Validate the added products in the database', ()=>{

  data.product1.totalPrice = data.product1.quantity * data.product1.productPrice
  
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

  product.getProductByID(`${data.product1.productID1}`)
  cy.wait(2000)
  product.clickAddToCartBtn(`${data.product1.productID1}`)   
  product.clickCloseModal()
  product.clickAddToCartBtn(`${data.product1.productID1}`) 
  product.clickCloseModal()

  product.getProductByID(`${data.product2.productID2}`)
  cy.wait(2000)
  product.clickAddToCartBtn(`${data.product2.productID2}`)   
  product.clickCloseModal()

  product.clickShopCartBtn()
  cy.getByDataCy('goBillingSummary').click()
  product.clickCheckoutBtn()
  product.fillBillingInfo(data.billing.firstName, data.billing.lastName, data.billing.cardNumber)
  cy.getByDataCy('purchase').click()


  // Validate the database

  cy.getByDataCy('sellId').invoke('text').then(sellId=>{
 
  const query = `SELECT id, product, quantity, total_price, price, sell_id FROM public."purchaseProducts" where sell_id =  ${sellId}`
  
    cy.task("connectDB", query).then((result)=>{      
   
    expect(result[0]).to.contain({           
    product: data.product1.productName, 
    quantity: data.product1.quantity,
    sell_id: parseInt(`${sellId}`),
    price: data.product1.productPrice
    })

    expect(result[1]).to.contain({     
      product: data.product2.productName, 
      quantity: data.product2.quantity,
      sell_id: parseInt(`${sellId}`),
      price: data.product2.productPrice
      })
  })
  })
})})

