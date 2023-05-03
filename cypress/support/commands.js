Cypress.Commands.add('preencherFormularioEEnviar', function(){
    cy.get('#firstName').type('leandro')
    cy.get('#lastName').type('Caldeira')
    cy.get('#email').type('leandro.caldeira@terra.com')
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()
})