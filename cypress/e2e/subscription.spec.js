import register from '../modules/register'
import { url, iphone_xr, email } from '../support/utils'

const SUBSCRIPTION_SELECTORS = {
    title: '.single-widget > h2',
    emailInput: '#susbscribe_email',
    subscribeButton: '#subscribe',
    successAlert: '.alert-success'
}

describe('Subscription', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()

        cy.navigateToLogin()
    });
    describe('Test Case 10: Verify Subscription in home page', () => {
        it('Should subscribe to newsletters', () => {
            cy.get(SUBSCRIPTION_SELECTORS.title).should('contain.text', 'Subscription')
            cy.get(SUBSCRIPTION_SELECTORS.emailInput).type(email)
            cy.get(SUBSCRIPTION_SELECTORS.subscribeButton).click()
            cy.get(SUBSCRIPTION_SELECTORS.successAlert)
                .should('be.visible')
                .and('contain.text', 'You have been successfully subscribed!')
                .then($element => {
                    cy.wrap($element)
                        .should('not.be.visible', { timeout: 10000 })
                })
        });
    })
})
