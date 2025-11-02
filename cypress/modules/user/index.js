class User {
    loginSelectors = {
        emailInput: '[data-qa="login-email"]',
        passwordInput: '[data-qa="login-password"]',
        loginButton: '[data-qa="login-button"]',
        errorMessage: '.login-form > form > p'
    }

    menuSelectors = {
        logoutLink: '.shop-menu > .nav > :nth-child(4) > a',
        deleteAccountLink: '.shop-menu > .nav > :nth-child(5) > a',
        loggedInAs: ':nth-child(10) > a'
    }

    accountSelectors = {
        deletedMessage: 'b'
    }

    login(email, password) {
        cy.get(this.loginSelectors.emailInput).type(email)
        cy.get(this.loginSelectors.passwordInput).type(password)
        cy.get(this.loginSelectors.loginButton).click()
    }

    logout() {
        cy.get(this.menuSelectors.logoutLink).click()
    }

    deleteAccount() {
        cy.get(this.menuSelectors.deleteAccountLink).click()
        cy.get(this.accountSelectors.deletedMessage).should('have.text', 'Account Deleted!')
    }

    assertLoggedin(firstName, lastName) {
        cy.get(this.menuSelectors.loggedInAs).should('contain.text', `Logged in as ${firstName} ${lastName}`)
    }

    assertNotLoggedin() {
        cy.get(this.loginSelectors.errorMessage).should('contain.text', 'Your email or password is incorrect!')
    }
}

export default new User()