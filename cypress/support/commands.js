Cypress.Commands.add('navigateToLogin', () => {
    cy.get('a[href="/login"]').click()
})