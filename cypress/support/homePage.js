export class HomePage{


    constructor() {
        this.onlineShopLink ='[data-cy="onlineshoplink"]'
        
    }

    clickOnlineShopLink(){
        cy.get(this.onlineShopLink).should('be.visible').click();
    }

  

}
export const mainPage = new HomePage()

