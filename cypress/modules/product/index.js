class Product {
    productMenuBtn = '.shop-menu > .nav > :nth-child(2) > a'
    searchInput = '#search_product'
    searchBtn = '#submit_search'
    viewProductBtn = ':nth-child(3) > .product-image-wrapper > .choose > .nav > li > a > .fa'
    productName = '.product-information > h2'
    productCategory = '.product-information > :nth-child(3)'
    productPrice = ':nth-child(5) > span'
    productAvailability = '.product-information > :nth-child(6)'
    productCondition = '.product-information > :nth-child(7)'
    productBrand = '.product-information > :nth-child(8)'
    
    navigateToProducts() {
        cy.get(this.productMenuBtn).click()
        cy.url().should('include', 'products')
    }

    searchProduct(productName) {
        cy.get(this.searchInput).type(productName)
        cy.get(this.searchBtn).click()
    }

    viewProductDetails() {
        cy.get(this.viewProductBtn).click()
    }

    verifyProductDetails(productInfo) {
        const {name, category, price, availability, condition, brand} = productInfo
        cy.get(this.productName).should('contain.text', name)
        cy.get(this.productCategory).should('contain.text', category)
        cy.get(this.productPrice).should('contain.text', price)
        cy.get(this.productAvailability).should('contain.text', availability)
        cy.get(this.productCondition).should('contain.text', condition)
        cy.get(this.productBrand).should('contain.text', brand)
    }

    verifySearchResults(expectedProducts) {
        expectedProducts.forEach((product, index) => {
            cy.get(`:nth-child(${index + 3}) > .product-image-wrapper > .single-products > .productinfo > p`)
                .should('contain.text', product)
        })
    }
}

export default new Product()