import { faker } from "@faker-js/faker"

export const url = 'https://automationexercise.com/'
export const iphone_xr = 'iphone-xr'

export const firstName = faker.person.firstName()
export const lastName = faker.person.lastName()
export const email = faker.internet.email({ firstName, lastName })
export const password = 'correct_pwd'
export const incorrectPassword = 'incorrect_pwd'