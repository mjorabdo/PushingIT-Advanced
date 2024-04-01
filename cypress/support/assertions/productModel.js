Cypress.Commands.add('verifyProducts', (products) => {
    let index = 0
    Cypress._.forEach(products, (product) => {
        cy.get('[class="css-4t9hm0"]').eq(index).within(() => {
            cy.get('[data-cy="name"]').should('have.text', product.name)
            cy.get('[data-cy="price"]').should('have.text', product.price)
        })
        index++
    })
});