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
    data.createProduct1.productPrice
  )

 cy.deleteProduct(randomID2)
 cy.addProduct(
      data.createProduct2.productName,
      data.createProduct2.productImageUrl,
      data.createProduct2.productID2,
      data.createProduct2.productPrice
    );
  
  mainPage.clickOnlineShopLink()
  cy.wait(100000)

  cy.get('[data-cy="search-type"]').select('name')
  cy.get('[data-cy="search-bar"]').should('be.visible').type('Blue Jacket').type('{enter}');

  cy.wait(2000)
  cy.get(`button[name="${data.createProduct1.productName}"]`).click({force: true})
  product.clickCloseModal()



  

  



  })

   
 
    
  
 





 

  
  
  
  
  




  
  

})

