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
it('Validate edit a product', ()=>{
  
  // productID Random number
  const randomID = product.generateRandomID()

  // Update value of productID
  data.createProduct.productID = randomID.toString();
  
  cy.productPage()  

  // Search the product and Delete if the product exist
  cy.getProduct(randomID).then(()=>{  
    cy.deleteProduct(Cypress.env('currentProductId'))
  })

  // Add a product
  cy.addProduct(
    data.createProduct.productName,
    data.createProduct.productImageUrl,
    data.createProduct.productID,
    data.createProduct.productPrice
  )  

  //Edit Product and validate it.
  cy.editProduct('White Jacket', ' ', '20.50').then(()=>{
  cy.visit(base);
  mainPage.clickOnlineShopLink();
  cy.url().should('contain', 'onlineshop');
  cy.getProductById(`${Cypress.env().productID}`).then(()=>{  
   expect( Cypress.env('productName')).to.eq(Cypress.env('editedProductName') )
   expect( Cypress.env('productPrice')).to.eq(Cypress.env('editedProductPrice') )
  })
 }) 
  })

   
 
    
  
 





 

  
  
  
  
  




  
  

})

