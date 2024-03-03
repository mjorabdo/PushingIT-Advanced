
import { login } from '../../../support/loginPage';
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

  // Search the product
  cy.getProduct('24')

  // Delete the product if exist
  cy.deleteProduct('24')

  // Add a product
  cy.addProduct(
    data.createProduct.productName,
    data.createProduct.productImageUrl,
    data.createProduct.productID,
    data.createProduct.productPrice
  )  

  //Edit Product
  cy.editProduct('White Jacket', 'imgURl', '20.50').then(()=>{

 // Visitar el sitio web
  cy.visit(base);
  mainPage.clickOnlineShopLink();
  cy.url().should('contain', 'onlineshop');

 // Search by ID the edited product
  cy.get('#search-type').select('id').then(()=>{
  cy.get('[data-cy="search-bar"]').should('be.visible').type(`${Cypress.env().productID}{enter}`);
  cy.log(`Searching for product with ID: ${Cypress.env().productID}`);

  // apartir de aca es cuando quiero seleccionar el boton del producto seleccionado por ID, para luego validar los datos, pero no me encuentra el btn de ese producto
  cy.get(`button[id="edit-${Cypress.env().productID}"]`).click()
  
 })

 
 
 
  })

   
 
    
  
 





 

  
  
  
  
  




  
  

})
})
