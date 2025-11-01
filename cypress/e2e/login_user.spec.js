import user from '../modules/user'
import register from '../modules/register'
import { url, iphone_xr, firstName, lastName, email, password } from '../support/utils'

describe('Login / Logout User', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()

        cy.navigateToLogin()
    });
    describe('Test Case 2: Login User with correct email and password', () => {
        it('Should Login User with correct e-mail and password', () => {
            register.fillSignupForm(firstName, lastName, email)

            register.fillFullRegisterForm(password)

            register.continue()

            user.logout()

            user.login(email, password)

            user.assertLoggedin(firstName, lastName)

            user.deleteAccount()
        });
    })
    describe('Test Case 3: Login User with incorrect email and password', () => {
        it('Should not Login User with incorrect e-mail and password', () => {
            register.fillSignupForm(firstName, lastName, email)

            register.fillFullRegisterForm(password)

            register.continue()

            user.logout()

            user.login(email, `invalid_${password}`)

            user.assertNotLoggedin()
        });
    })
    describe('Test Case 4: Logout User', () => {
        it('Should logout user', () => {
            user.login(email, password)

            user.assertLoggedin(firstName, lastName)

            user.logout()

            register.assertHomePage()
        });
    })
})
