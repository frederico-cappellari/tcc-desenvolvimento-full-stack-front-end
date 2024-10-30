describe('CarrosselComponent', () => {
  beforeEach(() => {
    // Chama o comando de login OAuth2
    cy.oauthLogin();
    // Visita a página do componente carrossel 
    cy.visit('http://localhost:4200/exemplo/carrossel');
  });

  it('Deve exibir o carrossel com o primeiro slide ativo', () => {
    // Verifica se o primeiro slide está visível
    cy.get('carousel slide')
      .first()
      .should('be.visible')
      .and('contain', 'Título 1');
  });

  it('Deve navegar automaticamente para o segundo slide após o intervalo', () => {
    // Espera pelo intervalo de tempo do carrossel para mudar o slide (exemplo: 4 segundos)
    cy.wait(4000);
    cy.get('carousel slide')
      .eq(1)
      .should('be.visible')
      .and('contain', 'Título 2');
  });

  it('Deve navegar para o próximo slide ao clicar no botão "Próximo"', () => {
    // Clica no botão para avançar manualmente
    cy.get('.carousel-control-next').click();
    cy.get('carousel slide')
      .eq(1)
      .should('be.visible')
      .and('contain', 'Título 2');
  });

  it('Deve navegar para o slide anterior ao clicar no botão "Anterior"', () => {
    // Avança para o segundo slide
    cy.get('.carousel-control-next').click();
    cy.get('carousel slide')
      .eq(1)
      .should('be.visible');
    // Volta para o primeiro slide
    cy.get('.carousel-control-prev').click();
    cy.get('carousel slide')
      .first()
      .should('be.visible')
      .and('contain', 'Título 1');
  });

});
