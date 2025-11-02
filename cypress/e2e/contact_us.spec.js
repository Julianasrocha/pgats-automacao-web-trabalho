import register from '../modules/register'
import { url, iphone_xr, firstName, lastName, email } from '../support/utils'

const SELECTORS = {
    contactUsLink: ':nth-child(8) > a',
    homeLink: '.nav > :nth-child(1) > a'
}

const FORM_SELECTORS = {
    title: 'div.contact-form > .title',
    nameInput: '[data-qa="name"]',
    emailInput: '[data-qa="email"]',
    subjectInput: '[data-qa="subject"]',
    messageInput: '[data-qa="message"]',
    fileInput: 'input[type="file"]',
    alternativeFileInput: ':nth-child(6) > .form-control',
    submitButton: '[data-qa="submit-button"]'
}

const MESSAGE_SELECTORS = {
    successMessage: '.status'
}

describe('Contact Us Form', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()

        cy.navigateToLogin()
    });
    describe('Test Case 6: Contact Us Form', () => {
        it('Should submit contact us form', () => {
            cy.get(SELECTORS.contactUsLink).click()

            cy.get(FORM_SELECTORS.title).should('contain.text', 'Get In Touch')

            cy.get(FORM_SELECTORS.nameInput).type(`${firstName} ${lastName}`)
            cy.get(FORM_SELECTORS.emailInput).type(email)
            cy.get(FORM_SELECTORS.subjectInput).type('Subject')
            cy.get(FORM_SELECTORS.messageInput).type('Message')

            const fileInput = cy.get(FORM_SELECTORS.fileInput)
                .then($el => $el.length ? cy.wrap($el) : cy.get(FORM_SELECTORS.alternativeFileInput))
            fileInput.attachFile('sample.txt', { force: true })

            cy.get(FORM_SELECTORS.submitButton).click()

            cy.get(MESSAGE_SELECTORS.successMessage)
                .should('contain.text', 'Success! Your details have been submitted successfully.')

            cy.get(SELECTORS.homeLink).click()

            register.assertHomePage()
        });
    })
})
