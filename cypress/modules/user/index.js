class User {
    login(email, password) {
        cy.get(`[data-qa="login-email"]`).type(email)
        cy.get('[data-qa="login-password"]').type(password)
        cy.get(`[data-qa="login-button"]`).click()
    }
    logout() {
        cy.get('.shop-menu > .nav > :nth-child(4) > a').click()
    }
    deleteAccount() {
        cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
        cy.get('b').should('have.text', 'Account Deleted!')
    }
    assertLoggedin(firstName, lastName) {
        cy.get(':nth-child(10) > a').should('contain.text', `Logged in as ${firstName} ${lastName}`)
    }
    assertNotLoggedin() {
        cy.get('.login-form > form > p').should('contain.text', 'Your email or password is incorrect!')
    }
}

export default new User()