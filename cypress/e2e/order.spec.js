import register from '../modules/register'
import user from '../modules/user'
import order from '../modules/order'
import { url, iphone_xr, firstName, lastName, email, password } from '../support/utils'

describe('Orders', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()
        cy.navigateToLogin()
    });

    describe('Test Case 15: Place Order: Register before Checkout', () => {
        it('Should place an order', () => {
            register.fillSignupForm(firstName, lastName, email)
            register.fillFullRegisterForm(password)
            register.continue()
            user.assertLoggedin(firstName, lastName)

            order.addProductToCart(1)

            order.navigateToCart()

            order.proceedToCheckout()

            order.verifyAddressAndOrder()

            order.addComment('Some comments')
            order.placeOrder()

            const paymentInfo = {
                nameOnCard: 'Test User',
                cardNumber: '4242424242424242',
                cvc: '123',
                expiryMonth: '12',
                expiryYear: '2025'
            }
            order.fillPaymentDetails(paymentInfo)
            order.confirmOrder()

            order.verifyOrderSuccess()

            user.deleteAccount()
            register.continue()
        });
    })

})
