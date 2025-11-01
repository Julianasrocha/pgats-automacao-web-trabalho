import register from '../modules/register'
import { url, iphone_xr, firstName, lastName, email } from '../support/utils'

describe('Contact Us Form', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()

        cy.navigateToLogin()
    });
    describe('Test Case 6: Contact Us Form', () => {
        it('Should submit contact us form', () => {
            cy.get(':nth-child(8) > a').click()

            cy.get('div.contact-form > .title').should('contain.text', 'Get In Touch')

            cy.get('[data-qa="name"]').type(`${firstName} ${lastName}`)
            cy.get('[data-qa="email"]').type(email)
            cy.get('[data-qa="subject"]').type('Subject')
            cy.get('[data-qa="message"]').type('Message')

            const fileInput = cy.get('input[type="file"]').then($el => $el.length ? cy.wrap($el) : cy.get(':nth-child(6) > .form-control'))
            fileInput.attachFile('sample.txt', { force: true })

            cy.get('[data-qa="submit-button"]').click()

            cy.get('.status').should('contain.text', 'Success! Your details have been submitted successfully.')

            cy.get('.nav > :nth-child(1) > a').click()

            register.assertHomePage()
        });
    })
})
