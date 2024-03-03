// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add('login', (username, password) => { 
    cy.request({
        url:`${Cypress.env().baseUrlApi }/login`,
        method:'POST',
        body:{
            username: username,
            password: password
        }
    }).then((response)=>{
        window.localStorage.setItem('token', response.body.token);
        window.localStorage.setItem('token', response.body.user.username);
        window.localStorage.setItem('token', response.body.user._id);
        Cypress.env().token = response.body.token
        
    })
 })

  



  



//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })