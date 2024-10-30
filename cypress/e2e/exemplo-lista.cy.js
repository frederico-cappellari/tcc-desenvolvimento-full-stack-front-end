describe('Exemplo List Component', () => {
  beforeEach(() => {
    // Chama o comando de login OAuth2
    cy.oauthLogin();
  });

  it('Deve navegar para a próxima página na paginação', () => {
    cy.get('.pagination').within(() => {
      cy.get('.page-link').contains('2').click();
    });
    cy.wait(500); // Aguarda a atualização dos dados da página
    cy.get('.section-list tbody tr').should('have.length.greaterThan', 0);
  });

  it('Deve redirecionar para a tela de adicionar novo item', () => {
    cy.get('.section-title .new-item').click();
    cy.url().should('include', '/exemplo/formulario/adicionar');
  });
});

