import { product } from "../productPage";
Cypress.Commands.add('verifyShoppingCart', (line, product) => {
    cy.get('li').eq(line).within(() => {
        const attributesToCheck = ['quantity', 'productName', 'productPrice', 'totalPrice'];

        let index = 0;
        attributesToCheck.forEach(attribute => {
            const value = product[attribute];
            if (attribute === 'productPrice' || attribute === 'totalPrice') {
                cy.formatNumberToUSCurrency(value).then(result => {
                    // If the result ends in for example '0.50' delete the last '0'
                    const formattedResult = result.replace(/(\.[0-9]*?)0$/, '$1').replace(/\.$/, '');
                    cy.get('p').eq(index).should('have.text', formattedResult);
                    cy.log(index);
                    index++;
                });
            } else {
                cy.get('p').eq(index).should('have.text', value);
                cy.log(index);
                index++;
            }
        });
    });
});






Cypress.Commands.add('verifyBillingSummary', (...products) => {
    let totalPrice = 0;
    products.forEach(product => {
        totalPrice += product.quantity * product.productPrice;
    });
    cy.get('[role="list"]').within(() => {
        cy.getByDataCy('subtotalAmount').should('have.text', `$${totalPrice}`);
        cy.getByDataCy('freightAmount').should('have.text', 'Free')
        cy.getByDataCy('totalPriceAmount').should('have.text', `$${totalPrice}`);
    });
});

Cypress.Commands.add('verifyPurchase', (data) => {
    cy.get('.css-1tcqc9o').within(() => {
        Cypress._.forEach(data, (value, selector) => {
            cy.get(`[id='${selector}']`).should('include.text', value);
        });
    });
});

        




