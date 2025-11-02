class Order {
    productSelectors = {
        addToCartBtn: (productId) => `:nth-child(${productId + 2}) > .product-image-wrapper > .single-products > .productinfo > .btn:first`,
        continueShopping: '.modal-footer > .btn'
    }

    cartButton = '.shop-menu > .nav > :nth-child(3) > a'
    checkoutButton = '.col-sm-6 > .btn'

    commentArea = '.form-control'
    placeOrderButton = ':nth-child(7) > .btn'
    paymentForm = {
        nameOnCard: '[data-qa="name-on-card"]',
        cardNumber: '[data-qa="card-number"]',
        cvc: '[data-qa="cvc"]',
        expiryMonth: '[data-qa="expiry-month"]',
        expiryYear: '[data-qa="expiry-year"]'
    }
    confirmOrderButton = '[data-qa="pay-button"]'
    successMessage = '[data-qa="order-placed"] > b'

    addProductToCart(productId = 1) {
        cy.get(this.productSelectors.addToCartBtn(productId)).first().click()
        cy.get(this.productSelectors.continueShopping).click() 
    }

    navigateToCart() {
        cy.get(this.cartButton).click()
        cy.url().should('include', 'view_cart')
    }

    proceedToCheckout() {
        cy.get(this.checkoutButton).click()
    }

    verifyAddressAndOrder() {
        cy.get('#address_delivery').should('be.visible')
        cy.get('#address_invoice').should('be.visible')
        cy.get('#cart_info').should('be.visible')
    }

    addComment(comment) {
        cy.get(this.commentArea).type(comment)
    }

    placeOrder() {
        cy.get(this.placeOrderButton).click()
    }

    fillPaymentDetails(paymentInfo) {
        const { nameOnCard, cardNumber, cvc, expiryMonth, expiryYear } = paymentInfo
        cy.get(this.paymentForm.nameOnCard).type(nameOnCard)
        cy.get(this.paymentForm.cardNumber).type(cardNumber)
        cy.get(this.paymentForm.cvc).type(cvc)
        cy.get(this.paymentForm.expiryMonth).type(expiryMonth)
        cy.get(this.paymentForm.expiryYear).type(expiryYear)
    }

    confirmOrder() {
        cy.get(this.confirmOrderButton).click()
    }

    verifyOrderSuccess() {
        cy.get(this.successMessage)
            .should('be.visible')
            .and('contain.text', 'Order Placed!')
    }
}

export default new Order()