import login from '../modules/login'
import register from '../modules/register'
import { faker } from "@faker-js/faker"

describe('Test Case 1: Register User', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr')
    cy.visit('https://automationexercise.com')

    cy.navigateToLogin()
  });
  it('Should Register a User', () => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    login.fillSignupForm(firstName, lastName)
    register.fillFullRegisterForm()

    // Assert
    cy.url().should('includes', 'account_created')
    cy.contains(`b`, 'Account Created!')
    cy.get('[data-qa="account-created"]').should('be.visible', 'ACCOUNT CREATED!')

    cy.get('[data-qa="continue-button"]').click()
    cy.get(':nth-child(10) > a').should('contain.text', `Logged in as ${firstName} ${lastName}`)

    cy.get('.shop-menu > .nav > :nth-child(5) > a').click()
    cy.get('b').should('have.text', 'Account Deleted!')
    cy.get('[data-qa="continue-button"]').click()
  })
})
