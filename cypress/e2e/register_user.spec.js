import user from '../modules/user'
import register from '../modules/register'
import { url, iphone_xr, firstName, lastName, email, password } from '../support/utils'

const REGISTER_SELECTORS = {
  nameInput: '[data-qa="signup-name"]',
  emailInput: '[data-qa="signup-email"]',
  signupButton: 'button:contains("Signup")',
  errorMessage: '.signup-form > form > p'
}

describe('Register User', () => {
  beforeEach(() => {
    cy.viewport(iphone_xr)
    cy.visit(url)
    register.assertHomePage()

    cy.navigateToLogin()
  });
  describe('Test Case 1: Register User', () => {
    it('Should Register a User', () => {
      register.fillSignupForm(firstName, lastName, email)
      register.fillFullRegisterForm(password)

      register.continue()

      user.assertLoggedin(firstName, lastName)

      user.deleteAccount()

      register.continue()
    })
  })
  describe('Test Case 5: Register User with existing email', () => {
    it('Should not Register a User with exising e-mail', () => {
      register.fillSignupForm(firstName, lastName, email)
      register.fillFullRegisterForm(password)

      register.continue()

      user.assertLoggedin(firstName, lastName)

      user.logout()

      cy.get(REGISTER_SELECTORS.nameInput).type(`${firstName} ${lastName}`)
      cy.get(REGISTER_SELECTORS.emailInput).type(`${email}`)
      cy.get(REGISTER_SELECTORS.signupButton).click()
      cy.get(REGISTER_SELECTORS.errorMessage).should('contain.text', 'Email Address already exist!')
    })
  })
});