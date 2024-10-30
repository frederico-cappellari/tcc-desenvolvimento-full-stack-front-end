describe('Autenticação OAuth2', () => {
  beforeEach(() => {
    // Chama o comando de login OAuth2
    cy.oauthLogin();
  });

  it('Deve acessar a página autenticada após o login', () => {
    // Adicione as verificações para a página autenticada
    cy.contains('Exemplo de Lista'); // Exemplo de verificação após o login
  });
});

