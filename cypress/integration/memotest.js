/// <reference types="Cypress" />

const URL = '127.0.0.1:8080';

context('Memotest', () => {

  before(() => {
    cy.visit(URL);
  });

  const NUMERO_CUADROS = 16;
  const DORSO = "./src/imagenes/playing-card-back.jpg";
  let cuadrosGuardados = []; 

  it('se asegura que haya un tablero con cuadros', () => {
    cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
  });

  it('se asegura que aparezca el dorso en todas las cartas', () => {
    cy.get(".cuadro").find('img').should('have.attr', 'src', DORSO);
  });

  it('se asegura que el boton empezar comience el juego', () => {
    cy.get('[id = "boton-empezar"]').click();
  });

  /*it('se asegura que haya un contador de tiempo', () => {
    cy.get('#tiempo').should(have.attr)
  })*/

  it('se asegura que las cartas sean aleatorias', () => {
   for(let i = 0; i < NUMERO_CUADROS; i++){
    cy.wait(500); 
    cy.get(`#cuadro${i}`).click();
    cy.wait(500);
    cy.get(`#cuadro${i}`).invoke('attr', 'src').then((srcValue) => {
      console.log('El valor de src es: ', srcValue);
      cuadrosGuardados.push(srcValue);
      //console.log(cuadrosGuardados);
    })
   }
  });

  it('Resuelve el juego', () => {
    console.log(cuadrosGuardados);
    //cy.visit(URL);
    //cy.get('[id = "boton-empezar"]').click();
    // Esperar un momento para que las cartas se volteen
    cy.wait(2000);

    const carta1 = Math.floor(Math.random() * NUMERO_CUADROS);
    console.log(carta1);
    const carta2 = (carta1 + 1) % NUMERO_CUADROS;
    console.log(carta2);

      // Hacer clic en la primera carta
      cy.get(`#cuadro${carta1}`).click();

      // Esperar un momento para que se voltee la primera carta
      cy.wait(500);
  
      // Hacer clic en la segunda carta
      cy.get(`#cuadro${carta2}`).click();
  
      // Esperar un momento para que se voltee la segunda carta
      cy.wait(500);
  
      // Verificar que las imágenes de las cartas se han cambiado
      cy.get(`#cuadro${carta1}`).should('not.have.attr', 'src', './src/imagenes/playing-card-back.jpg');
      cy.get(`#cuadro${carta2}`).should('not.have.attr', 'src', './src/imagenes/playing-card-back.jpg');
    });
  //})
});


