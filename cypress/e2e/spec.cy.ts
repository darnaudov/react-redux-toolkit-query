/// <reference types="Cypress" />

describe('Product cart', () => {
  it('should be able to add and remove products from products list and cart', () => {
    cy.fixture('user').then((user) => {
      cy.fixture('products').then((products) => {
        cy.intercept(
          {
            method: 'GET',
            url: '/products',
          },
          products
        ).as('getProducts');

        cy.visit('/');
        cy.url().should('include', '/login');
        cy.contains(/email/i).type(user.email);
        cy.contains(/password/i).type(user.password);
        cy.contains(/login/i).click();

        cy.contains(/home/i);
        cy.contains(new RegExp(`wellcome ${user.email}`, 'i'));
        cy.contains(/products/i).click();
        cy.url().should('include', '/products');

        let totalPrice = 0;
        for (let product of products) {
          cy.contains(`${product.name} ${product.price}`)
            .contains(/add to cart/i)
            .click();

          totalPrice += product.price;
        }

        cy.contains(/cart \(3\)/i).click();
        cy.url().should('include', '/cart');
        cy.contains(`Total Price: $${totalPrice}`);

        for (let product of products) {
          cy.contains(`${product.name} ${product.price} x 1`)
            .contains(/\+/i)
            .click()
            .click();
        }

        cy.contains(`Total Price: $${totalPrice * 3}`);

        for (let product of products) {
          cy.contains(`${product.name} ${product.price} x 3`)
            .contains(/-/i)
            .click();
        }

        cy.contains(`Total Price: $${totalPrice * 2}`);

        for (let product of products) {
          cy.contains(`${product.name} ${product.price} x 2`);
        }

        cy.contains(/clear cart/i).click();
        cy.contains('Total Price: $0');

        for (let product of products) {
          cy.contains(`${product.name} ${product.price}`).should('not.exist');
        }
      });
    });
  });
});
