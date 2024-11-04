describe('Exemplo Edit Component', () => {
  beforeEach(() => {
    // Chama o comando de login OAuth2
    cy.oauthLogin();
    cy.visit('https://apm02.des.intra.rs.gov.br/exemplo/formulario/adicionar');
  });

  it('Deve carregar o formulário com os campos vazios ou preenchidos conforme o estado inicial', () => {
    cy.get('textarea#nomeAlu').should('have.value', '');
    cy.get('input#nroIntAlu').should('be.disabled');
    cy.get('input#ano').should('exist');
    cy.get('ng-select#curso').should('exist');
    cy.get('input#iptData').should('exist');
  });

  it('Deve exibir mensagens de erro ao tentar salvar sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    cy.get('app-field-message').should('contain', 'Campo obrigatório'); // Ou o texto específico da mensagem de erro
  });

  it('Deve preencher e enviar o formulário corretamente', () => {
    const random = Math.round(Math.random() * 10000);
    cy.get('textarea#nomeAlu').clear().type('Aluno ' + random);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains('Criado com sucesso!').should('be.visible');
  });

  it('Deve carregar dados para edição e salvar as alterações', () => {
    cy.visit('https://apm02.des.intra.rs.gov.br/exemplo/formulario/10642');
    const random = Math.round(Math.random() * 10000);
    cy.get('textarea#nomeAlu').clear().type('Aluno ' + random);
    cy.get('button[type="submit"]').click();
    cy.wait(1000);
    cy.contains('Alterado com sucesso!').should('be.visible');
  });

});
