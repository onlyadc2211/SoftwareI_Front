describe('Login', () => {
  it('should log in successfully', () => {
    cy.visit('http://localhost:5173/'); 

    cy.get('input[type="text"]').type('cs');
    cy.get('input[type="password"]').type('123');
    cy.get('form').submit();
    cy.url().should('include', '/cropManagement');

  });

});