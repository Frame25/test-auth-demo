import DATA from '../../shared/data.json';

describe('Auth Flow', () => {
  beforeEach(() => {
    // Clear any existing session before each test
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();
  });

  it('should login with demo credentials', () => {
    // Visit login page
    cy.visit('/login');

    // Fill in credentials
    cy.get('button[aria-label="Fill form with demo credentials"]').click();

    // Verify form values and wait for validation
    cy.get('input[name="email"]')
      .should('have.value', DATA.users[0].email)
      .should('not.have.class', 'error');

    cy.get('input[name="password"]')
      .should('have.value', DATA.users[0].password)
      .should('not.have.class', 'error');

    // Wait for button to be enabled
    cy.get('button[type="submit"]')
      .should('not.have.class', 'opacity-50')
      .should('not.be.disabled')
      .click();

    // Wait for success notification
    cy.contains('You logged in successfully').should('be.visible');

    // Wait for navigation and verify redirect
    cy.url().should('eq', `${Cypress.config().baseUrl}/`);

    // Verify logged in state
    cy.contains('You have logged in as:').should('be.visible');
    cy.get('#user-name').should('contain', DATA.users[0].name);
  });
});

export {};
