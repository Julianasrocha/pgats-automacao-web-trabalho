import { faker } from "@faker-js/faker"
import { url } from '../../support/utils'

class Register {
    signupSelectors = {
        nameInput: '[data-qa="signup-name"]',
        emailInput: '[data-qa="signup-email"]',
        signupButton: 'button:contains("Signup")',
        formTitle: 'h2.title'
    }

    accountFormSelectors = {
        gender: '#id_gender1',
        password: 'input#password',
        days: 'select[data-qa="days"]',
        months: 'select[data-qa="months"]',
        years: 'select[data-qa="years"]',
        newsletter: 'input[type=checkbox]#newsletter',
        specialOffers: 'input[type=checkbox]#optin',
        firstName: 'input#first_name',
        lastName: 'input#last_name',
        company: 'input#company',
        address: 'input#address1',
        country: 'select#country',
        state: 'input#state',
        city: 'input#city',
        zipcode: '[data-qa="zipcode"]',
        mobileNumber: '[data-qa="mobile_number"]',
        createAccount: '[data-qa="create-account"]',
        accountCreated: '[data-qa="account-created"]'
    }

    navigationSelectors = {
        continueButton: '[data-qa="continue-button"]'
    }

    fillSignupForm(firstName, lastName, email) {
        cy.get(this.signupSelectors.nameInput).type(`${firstName} ${lastName}`)
        cy.get(this.signupSelectors.emailInput).type(`${email}`)

        cy.get(this.signupSelectors.signupButton).click()

        cy.get(this.signupSelectors.formTitle)
            .contains('Enter Account Information')
            .should('be.visible')
    }

    fillFullRegisterForm(password) {
        cy.get(this.accountFormSelectors.gender).check()
        cy.get(this.accountFormSelectors.password).type(password, { log: false })

        //para combobox ou selects -> select
        cy.get(this.accountFormSelectors.days).select('20')
        cy.get(this.accountFormSelectors.months).select('September')
        cy.get(this.accountFormSelectors.years).select('1992')

        // radio ou checkboxes -> check
        cy.get(this.accountFormSelectors.newsletter).check()
        cy.get(this.accountFormSelectors.specialOffers).check()

        cy.get(this.accountFormSelectors.firstName).type(faker.person.firstName())
        cy.get(this.accountFormSelectors.lastName).type(faker.person.lastName())
        cy.get(this.accountFormSelectors.company).type(`PGATS ${faker.company.name()}`)
        cy.get(this.accountFormSelectors.address).type(faker.location.streetAddress())
        cy.get(this.accountFormSelectors.country).select('Canada')
        cy.get(this.accountFormSelectors.state).type(faker.location.state())
        cy.get(this.accountFormSelectors.city).type(faker.location.city())
        cy.get(this.accountFormSelectors.zipcode).type(faker.location.zipCode())
        cy.get(this.accountFormSelectors.mobileNumber).type('111 222 3333 ')

        // Act
        cy.get(this.accountFormSelectors.createAccount).click()

        // Assert
        cy.url().should('includes', 'account_created')
        cy.contains(`b`, 'Account Created!')
        cy.get(this.accountFormSelectors.accountCreated).should('be.visible', 'ACCOUNT CREATED!')
    }

    continue() {
        cy.get(this.navigationSelectors.continueButton).click()
    }

    assertHomePage() {
        cy.url().should('eq', url)
    }

    assertLoginPage() {
        cy.url().should('eq', `${url}login`)
    }
}

export default new Register()