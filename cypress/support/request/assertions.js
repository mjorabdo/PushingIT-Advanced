Cypress.Commands.add('verifyShoppingCart', (line, product) => {
    let index = 0
    cy.get('li').eq(line).within(() => {
        Cypress._.forEach(product, (value, atributo) => {
            if (atributo === 'price' || atributo === 'totalPrice') {
                cy.formatNumberToUSCurrency(value).then(result => {
                    cy.get('p').eq(index).should('have.text', result)
                    index++
                });
            } else {
                cy.get('p').eq(index).should('have.text', value);
                index++
            };
        });
    });
});