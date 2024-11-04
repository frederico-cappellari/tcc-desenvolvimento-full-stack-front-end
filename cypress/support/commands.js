/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }


Cypress.Commands.add('oauthLogin', () => {
  // Acessa a página inicial de login do seu site
  cy.session([Cypress.env('organizacao'), Cypress.env('matricula'), Cypress.env('senha')], () => {
    cy.visit('https://apm02.des.intra.rs.gov.br/login');

    // Clica no botão para redirecionar para a página externa de login
    cy.get('button .marca-soe').click();

    // Usa cy.origin para lidar com o domínio externo de autenticação
    cy.origin('https://soe.intra.rs.gov.br', () => {
      // Insere as credenciais de autenticação
      cy.get('input[name="organizacao"]').clear().type(Cypress.env('organizacao'));
      cy.get('input[name="matricula"]').clear().type(Cypress.env('matricula'));
      cy.get('input[name="senha"]').clear().type(Cypress.env('senha'));

      // Clica no botão de login
      cy.get('input#btnLogonOrganizacao').click();
    });

    // Verifica se o redirecionamento para a página autenticada do seu site foi bem-sucedido
    cy.url().should('include', 'http://localhost:4200');
    cy.wait(1000);
  });
});
