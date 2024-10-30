describe('ModalComponent', () => {
  beforeEach(() => {
    // Chama o comando de login OAuth2
    cy.oauthLogin();
    // Visita a página do componente modal
    cy.visit('http://localhost:4200/exemplo/modal');
  });

  it('Deve abrir e fechar o modal corretamente', () => {
    // Verifica se o modal está inicialmente fechado
    cy.get('.modal').should('not.exist');
    // Abre o modal
    cy.get('button.btn-primary').contains('Abrir Modal').click();
    // Verifica se o modal está visível
    cy.get('.modal').should('be.visible');
    cy.get('.modal-header .modal-title').should('contain', 'Modal');
    cy.get('.modal-body').should('contain', 'Este é um Modal.');
    // Fecha o modal usando o botão de fechar no cabeçalho
    cy.get('.modal-header .btn-close').click();
    // Verifica se o modal foi fechado
    cy.get('.modal').should('not.exist');
  });

  it('Deve fechar o modal ao clicar no botão de "Fechar" no rodapé', () => {
    // Abre o modal
    cy.get('button.btn-primary').contains('Abrir Modal').click();
    // Verifica se o modal está visível
    cy.get('.modal').should('be.visible');
    // Fecha o modal usando o botão "Fechar" no rodapé
    cy.get('.modal-footer .btn-default').contains('Fechar').click();
    // Verifica se o modal foi fechado
    cy.get('.modal').should('not.exist');
  });
});
