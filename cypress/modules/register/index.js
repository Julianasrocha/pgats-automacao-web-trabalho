import { faker } from "@faker-js/faker"

class Register {
    fillSignupForm(firstName, lastName, email) {
        cy.get('[data-qa="signup-name"]').type(`${firstName} ${lastName}`)
        cy.get('[data-qa="signup-email"]').type(`${email}`)

        cy.contains('button', 'Signup').click()

        cy.get('h2.title')
            .contains('Enter Account Information')
            .should('be.visible')
    }
    fillFullRegisterForm(password) {
        cy.get('#id_gender1').check()

        cy.get('input#password').type(password, { log: false })

        //para combobox ou selects -> select
        cy.get('select[data-qa="days"]').select('20')
        cy.get('select[data-qa="months"]').select('September')
        cy.get('select[data-qa="years"]').select('1992')

        // radio ou checkboxes -> check
        cy.get('input[type=checkbox]#newsletter').check()
        cy.get('input[type=checkbox]#optin').check()

        cy.get('input#first_name').type(faker.person.firstName())
        cy.get('input#last_name').type(faker.person.lastName())
        cy.get('input#company').type(`PGATS ${faker.company.name()}`)
        cy.get('input#address1').type(faker.location.streetAddress())
        cy.get('select#country').select('Canada')
        cy.get('input#state').type(faker.location.state())
        cy.get('input#city').type(faker.location.city())
        cy.get('[data-qa="zipcode"]').type(faker.location.zipCode())
        cy.get('[data-qa="mobile_number"]').type('111 222 3333 ')

        // Act
        cy.get('[data-qa="create-account"]').click()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains(`b`, 'Account Created!')
        cy.get('[data-qa="account-created"]').should('be.visible', 'ACCOUNT CREATED!')
    }
    continue() {
        cy.get('[data-qa="continue-button"]').click()
    }
    assertHomePage() {
        cy.get(':nth-child(4) > a').should('contain.text', 'Signup / Login')
    }
}

export default new Register()