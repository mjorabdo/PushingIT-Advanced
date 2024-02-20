export class Login{


    constructor() {
        this.logInBtn ='span[data-cy="registertoggle"]'
        this.username = '[data-cy="user"]'
        this.password = '[data-cy="pass"]'
        this.submitBtn = '[data-cy="submitForm"]'
    }

    clickLogInLink(){
        cy.get(this.logInBtn).should('be.visible').dblclick();
    }

    fillUsername(user){
        cy.get(this.username).type(user)
    }
    fillPassword(password){
        cy.get(this.password).type(password)
    }

    clickLogInBtn(){
        cy.get(this.submitBtn).click()
    }

}
export const login = new Login()

