import { mainPage } from '../../../support/homePage';
import { product } from '../../../support/productPage';

const base = Cypress.env("baseUrl");
const username = Cypress.env("username")
const password = Cypress.env("password")


describe('', ()=>{

let data 

before('Fixture',()=>{
    cy.fixture('deleteProduct').then(fixtureData => {
        data = fixtureData;  
      });
})
beforeEach('', ()=>{
    cy.login(username, password)
    cy.visit(base)    
})
it('Validate the added products in the database', ()=>{

  data.createProduct1.totalPrice = data.createProduct1.quantity * data.createProduct1.productPrice
  
  // productID Random number
  const randomID1 = product.generateRandomID()
  const randomID2 = product.generateRandomID()
  

  // Update value of productID
  data.createProduct1.productID1 = randomID1.toString();
  data.createProduct2.productID2 = randomID2.toString();

  cy.productPage()  

  // Create 2 products

  cy.deleteProduct(randomID1)
  cy.addProduct(
    data.createProduct1.productName,
    data.createProduct1.productImageUrl,
    data.createProduct1.productID1,
    data.createProduct1.productPrice,
    
  )

 cy.deleteProduct(randomID2)
 cy.addProduct(
      data.createProduct2.productName,
      data.createProduct2.productImageUrl,
      data.createProduct2.productID2,
      data.createProduct2.productPrice,
      
    );
  
  mainPage.clickOnlineShopLink()

  // Add created products to the shopping Cart

  product.getProductByID(`${data.createProduct1.productID1}`)
  cy.wait(2000)
  product.clickAddToCartBtn(`${data.createProduct1.productID1}`)   
  product.clickCloseModal()
  product.clickAddToCartBtn(`${data.createProduct1.productID1}`) 
  product.clickCloseModal()

  product.getProductByID(`${data.createProduct2.productID2}`)
  cy.wait(2000)
  product.clickAddToCartBtn(`${data.createProduct2.productID2}`)   
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
    product: data.createProduct1.productName, 
    quantity: data.createProduct1.quantity,
    sell_id: parseInt(`${sellId}`),
    price: data.createProduct1.productPrice
    })

    expect(result[1]).to.contain({     
      product: data.createProduct2.productName, 
      quantity: data.createProduct2.quantity,
      sell_id: parseInt(`${sellId}`),
      price: data.createProduct2.productPrice
      })
  })
  })
})})

