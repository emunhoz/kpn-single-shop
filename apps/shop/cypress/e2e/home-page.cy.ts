describe('[Page]: Home', () => {
  it('render home page', () => {
    cy.visit('http://localhost:3000/')
    const initialQuantity = 58
    cy.get('h2')
      .contains(`Choose from ${initialQuantity} phones`)
      .should('be.visible')

    cy.contains('label', 'Refurbished').should('be.visible')
    cy.contains('label', '5g').should('be.visible')
    cy.contains('label', 'e-sim').should('be.visible')
    cy.contains('label', 'Apple').should('be.visible')
    cy.contains('label', 'Android').should('be.visible')

    cy.get('.product-list').find('li').should('have.length', initialQuantity)
  })

  it('filter `Refurbished` should render only refurbished phones', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('label', 'Refurbished').click()
    cy.get('h2').contains(`Choose from 5 phones`).should('be.visible')

    cy.get('.product-list').find('.list').should('include.text', 'refurbished')
  })

  it('`Android` filter render their phones', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('label', 'Android').click()

    cy.get('.product-list').find('.list').should('not.include.text', 'Apple')
  })

  it('`Apple` filter render their phones', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('label', 'Apple').click()

    cy.get('.product-list').find('.list').should('not.include.text', 'Samsung')
    cy.get('.product-list')
      .find('.list')
      .should('not.include.text', 'Fairphone')
    cy.get('.product-list').find('.list').should('not.include.text', 'Nokia')
    cy.get('.product-list').find('.list').should('not.include.text', 'Xiaomi')
    cy.get('.product-list').find('.list').should('include.text', 'Apple')
  })

  it("render message when aren't phones to show", () => {
    cy.visit('http://localhost:3000/')
    cy.contains('label', 'Refurbished').click()
    cy.contains('label', '5g').click()

    cy.get('h2').contains(`No items were found!`).should('be.visible')
  })
})
