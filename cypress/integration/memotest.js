/// <reference types="Cypress" />

const URL = '127.0.0.1:8080';

context('Memotest', () => {

  before(() => {
    cy.visit(URL);
  });

  const NUMERO_CUADROS = 16;

  it('se asegura que haya un tablero con cuadros', () => {
    cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
  });

  it('se asegura que el boton empezar comience el juego', () => {
    cy.get('[id = "boton-empezar"]').click();
  });

});