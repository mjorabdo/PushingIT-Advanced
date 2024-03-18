import data from '../fixtures/deleteProduct.json';

export class ProductPage {
  constructor() {
    this.onlineShopTitle = '.css-1vqu2wk';
    this.addProductBtn = '[data-cy="add-product"]';
    this.productNameInput = '[data-cy="productName"]';
    this.productPriceInput = '[data-cy="productPrice"]';
    this.productImageURLInput = '[data-cy="productCard"]';
    this.productIDInput = '[data-cy="productID"]';
    this.createProductBtn = '[data-cy="createProduct"]';
    this.searchProduct = '[data-cy="search-bar"]';
    this.closeModal = '#closeModal';
    this.searchType = '#search-type';
    this.searchBar = '[data-cy="search-bar"]';
    this.deleteBtn = '#saveEdit';
    this.msgAlert = '[role="dialog"] div p';
    this.randomID = ''; // Inicializa randomID
    this.goShoppingCartBtn = '#goShoppingCart'
  }

  generateRandomID() {
    this.randomID = Math.floor(Math.random() * 100) + 1;
    return this.randomID.toString();
  }

  clickAddProductBtn() {
    cy.get(this.addProductBtn).click();
  }

  fillProductName(string) {
    cy.get(this.productNameInput).type(string);
  }

  fillProductPrice(number) {
    cy.get(this.productPriceInput).type(number);
  }

  fillProductImageURL(string) {
    cy.get(this.productImageURLInput).type(string);
  }

  fillProductID(number) {
    cy.get(this.productIDInput).type(number);
  }

  fillForm() {
    this.generateRandomID(); // Llama a generateRandomID para generar el ID
    data.createProduct.productID = this.randomID;
    this.fillProductName(data.createProduct.productName);
    this.fillProductPrice(data.createProduct.productPrice);
    this.fillProductImageURL(data.createProduct.productImageUrl);
    this.fillProductID(data.createProduct.productID);
  }

  clickCreateProdBtn() {
    cy.get(this.createProductBtn).click({ force: true });
  }

  clickCloseModal() {
    cy.get(this.closeModal).click();
  }

  selectSearchByID() {
    cy.get(this.searchType).select('id');
  }

  clickDeleteIcon() {
    this.getDeleteIcon().click();
  }

  clickDeleteBtn() {
    cy.get(this.deleteBtn).click();
  }

  getDeleteIcon() {
    const deleteIconSelector = `[data-cy="delete-${this.randomID}"]`;
    return cy.get(deleteIconSelector);
  }
  searchProductByID() {
    this.selectSearchByID();
  
    // Wait for the product ID to be set
    return cy.wrap(Cypress.env()).should('have.property', 'productId').then(() => {
      // Use the stored product ID directly
      cy.get(this.searchBar).should('be.visible').type(`${Cypress.env().productId}{enter}`).then(() => {
        cy.log(`Searching for product with ID: ${Cypress.env().productId}`);
      });
    });
  }

  getProductByName(productName){
    return cy.get(this.searchType).select('name').then(()=>{
       cy.get(this.searchBar).should('be.visible').type(`${productName} {enter}`)
       cy.wait(2000)
    })
    
  }
  clickShoppCartBtn(){
    cy.get(this.goShoppingCartBtn).click()
  }
  
  
  
  
}

export const product = new ProductPage();
