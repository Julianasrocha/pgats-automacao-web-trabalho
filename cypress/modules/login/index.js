import { faker } from "@faker-js/faker"

class Login {
    fillSignupForm(firstName, lastName) {
        const timestamp = new Date().getTime()

        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(`${firstName}.${lastName}-${timestamp}@test.com`)

        cy.contains('button', 'Signup').click()

        cy.get('h2.title')
            .contains('Enter Account Information')
            .should('be.visible')
    }
}

export default new Login()