
import './assertions/productModel'
import './assertions/shoppingCartModel'

Cypress.Commands.add('login', (username, password) => { 
    cy.session('loginWithSession', ()=>{
        cy.request({
            url:`${Cypress.env().baseUrlApi }/login`,
            method:'POST',
            body:{
                username: username,
                password: password
            }
        }).then((response)=>{
    
            window.localStorage.setItem('token', response.body.token);
            window.localStorage.setItem('user', response.body.user.username);
            window.localStorage.setItem('userId', response.body.user._id);
            Cypress.env().token = response.body.token        
        })
    })
  
 })

 Cypress.Commands.add('getByDataCy', (selector) => {
    return cy.get(`[data-cy=${selector}]`)
})



Cypress.Commands.add('formatNumberToUSCurrency', (number) => {
    return number.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
    });
})

  
