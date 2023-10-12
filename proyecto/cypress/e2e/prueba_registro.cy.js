describe('Registro', () => {
  it('debería registrarse con éxito', () => {
    cy.visit('http://localhost:5173/'); 

    cy.contains('Registro').click();
    cy.get('form', { timeout: 10000 }).should('be.visible');
    cy.get('#cedula').type('4');
    cy.get('#rol').select('Administrador');
    cy.get('#usuarioRegistro').type('usuario');
    cy.get('#correo').type('nuevo@correo.com');
    cy.get('#contrasena').type('123');
    cy.get('#confirmarContrasena').type('123');
    cy.get('#submitBtn').click();

    cy.contains('Registrado con éxito').should('be.visible');
  });
  
});
