/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function() {
    beforeEach(function(){
        cy.visit('./src/index.html')
    })
  it('verifica o título da aplicação', function() {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })
  it('preenche os campos obrigatorios e envia o formulário', function(){
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('leandro')
    cy.get('#lastName').type('Caldeira')
    cy.get('#email').type('leandro.caldeira@terra.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function (){
    const longText = 'Teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste, teste'
    cy.get('#firstName').type('leandro')
    cy.get('#lastName').type('Caldeira')
    cy.get('#email').type('leandro.caldeira')
    cy.get('#open-text-area').type(longText, {delay: 0})
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('campo telefone continua vazio ao digitar caractere diferente de numero', function (){
    cy.get('#firstName').type('leandro')
    cy.get('#lastName').type('Caldeira')
    cy.get('#email').type('leandro.caldeira@terra.com')
    cy.get('#open-text-area').type('teste')
    cy.contains('button','Enviar').click()
    cy.get('#phone')
    .type('abcd').should('have.value','')

    cy.get('.success').should('be.visible')
  })
  it('mensagem de erro falta de preenchimento do telefone quando obrigatorio', function(){
    cy.get('#firstName').type('leandro')
    cy.get('#lastName').type('Caldeira')
    cy.get('#email').type('leandro.caldeira@teste.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })
  it('Verificar o valor inserido e depois verificar após limpar', function(){
    cy.get('#firstName').type('leandro').should('have.value', 'leandro')
    cy.get('#lastName').type('Caldeira').should('have.value', 'Caldeira')
    cy.get('#email').type('leandro.caldeira@teste.com').should('have.value', 'leandro.caldeira@teste.com')
    cy.get('#firstName').clear().should('have.value', '')
    cy.get('#lastName').clear().should('have.value', '')
    cy.get('#email').clear().should('have.value', '')
    
  })
  it('Teste para validar mensagem de erro ao clicar no botão enviar sem preencher nenhum dado obrigatorio', function(){
    cy.contains('button','Enviar').click()
    cy.get('.error').should('be.visible')
  })
  it('Teste usando commands', function(){
    cy.preencherFormularioEEnviar()

    cy.get('.success').should('be.visible')


  })
  it('Selecionando o elemento no select', function(){
    cy.get('#product').select('YouTube')
    .should('have.value', 'youtube')
  })
  it('Selecionando o elemento no select 2', function(){
    cy.get('#product').select('mentoria')
    .should('have.value', 'mentoria')
  })
  it('Selecionando o elemento no select 3', function(){
    cy.get('#product').select(1)
    .should('have.value', 'blog')
  })
  it('Utilizando o botão radio', function(){
    cy.get('input[type="radio"][value="feedback"]')
    .check()
    .should('have.value', 'feedback')
  })
  it('marcar cada elemento radio', function(){
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(function($radio){
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
    })
  })
  it('marcando todos os checkboxs e desmarcando o ultimo', function(){
    cy.get('input[type="checkbox"]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('not.be.checked')
  })
  it('selecionando um arquivo para envio', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('selecionando um arquivo para envio', function(){
    cy.get('input[type="file"]')
    .should('not.have.value')
    .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('subindo um arquivo usando alias', function(){
    cy.fixture('example.json').as('sampleExample')
    cy.get('input[type="file"]')
    .selectFile('@sampleExample')
    .should(function($input){
        expect($input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verificação da politica de privacidade abrindo em outra pagina', function(){
    cy.get('#privacy a').should('have.attr', 'target', '_blank')
  })
  it('abrindo a pagina retirando o target', function(){
    cy.get('#privacy a')
    .invoke('removeAttr', 'target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
})
