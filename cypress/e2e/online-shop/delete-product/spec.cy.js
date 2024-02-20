import data from '../../../fixtures/deleteProduct-15.json'
import { login } from '../../../support/loginPage';
import { mainPage } from '../../../support/homePage';
import { product } from '../../../support/productPage';
const base = Cypress.env("baseUrl");

describe('Delete Product - Online shop',()=>{

    beforeEach('User should LogIn', ()=>{
        cy.visit(base)
        login.clickLogInLink()
        login.fillUsername(data.login.username)
        login.fillPassword(data.login.password)
        login.clickLogInBtn()
    })
    it('TC1: Validate delete an added product', ()=>{

         // productID Random number
         const randomID = product.generateRandomID()

        // Update value of productID
         data.createProduct.productID = randomID.toString();

         // Click OnlineShop Link
         mainPage.clickOnlineShopLink()
         cy.url().should('contain', 'onlineshop')

         // Add Product
         product.clickAddProductBtn()
         product.fillForm()
         product.clickCreateProdBtn()
         product.clickCloseModal()
     
        // Search product by ID
        product.searchProductByID()

        // Delete Product
        product.clickDeleteIcon()
        product.clickDeleteBtn()
        cy.wait(2000)
        cy.get(product.msgAlert).invoke('text').should('contain', data.createProduct.productName + " has been deleted")
        product.clickCloseModal()
              
        // Validate product has been delete
        product.searchProductByID()
        product.getDeleteIcon().should('not.exist')


    })
})