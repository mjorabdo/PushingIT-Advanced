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
    this.randomID = ''; 
    this.goShoppingCartBtn = '#goShoppingCart';
    this.checkoutBtn = '#goCheckout';
    this.firstName= '[data-cy="firstName"]';
    this.lastName= '[data-cy="lastName"]';
    this.cardNumber= '[data-cy="cardNumber"]'
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
  

  getProductByID(productID){
    cy.get(this.searchType).select('id')
    cy.get(this.searchBar).should('be.visible').clear().type(`${productID} {enter}`)     
    
  }
  getProductByName(productName){
    cy.get(this.searchType).select('name')
    cy.get(this.searchBar).should('be.visible').type(`${productName} {enter}`)     
    
  }
  clickShopCartBtn(){
    cy.get(this.goShoppingCartBtn).click()
  }
  clickAddToCartBtn(prodName){
    cy.get(`#add-to-cart-${prodName}`).click({force: true})
  }

  clickCheckoutBtn(){
    cy.get(this.checkoutBtn).click()
  }
  fillBillingInfo(firstName, lastName, cardNumber){
    cy.get(this.firstName).type(firstName)
    cy.get(this.lastName).type(lastName)
    cy.get(this.cardNumber).type(cardNumber)
  }
  
  
  
}

export const product = new ProductPage();
