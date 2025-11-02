import register from '../modules/register'
import product from '../modules/product'
import { url, iphone_xr, firstName, lastName, email } from '../support/utils'

describe('Products', () => {
    beforeEach(() => {
        cy.viewport(iphone_xr)
        cy.visit(url)
        register.assertHomePage()
    });

    describe('Test Case 8: Verify All Products and product detail page', () => {
        it('Should check all products and details', () => {
            product.navigateToProducts()
            product.viewProductDetails()

            cy.url().should('eq', `${url}product_details/1`)

            const productInfo = {
                name: 'Blue Top',
                category: 'Category: Women > Tops',
                price: 'Rs. 500',
                availability: 'Availability: In Stock',
                condition: 'Condition: New',
                brand: 'Brand: Polo'
            }

            product.verifyProductDetails(productInfo)
        });
    })

    describe('Test Case 9: Search Product', () => {
        it('Should search a product', () => {
            product.navigateToProducts()
            product.searchProduct('T-Shirt')

            const expectedProducts = [
                'Pure Cotton V-Neck T-Shirt',
                'Green Side Placket Detail T-Shirt',
                'Premium Polo T-Shirts'
            ]

            product.verifySearchResults(expectedProducts)
        });
    })
})
