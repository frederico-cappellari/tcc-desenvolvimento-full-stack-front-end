describe('API Alunos', () => {
  const authorization = Cypress.env('token');

  it("Valida a presença das propriedades na resposta da API de alunos", () => {
    cy.request({
      method: 'GET',
      url: 'https://apm-quarkus.apps.kildes4830.des.intra.rs.gov.br/alunos?asc=true',
      headers: { authorization },
    }).then((res) => {
      // Verifica o status da resposta
      expect(res.status).to.be.equal(200);

      // Valida que o corpo da resposta não está vazio
      expect(res.body).to.not.be.empty;

      // Verifica a presença das propriedades principais na resposta, sem verificar o valor
      expect(res.body).to.have.property('ascending');
      expect(res.body).to.have.property('page');
      expect(res.body).to.have.property('pageCount');
      expect(res.body).to.have.property('pageSize');
      expect(res.body).to.have.property('total');

      // Valida que a propriedade 'data' existe e é uma lista com objetos
      expect(res.body).to.have.property('data').that.is.an('array');

      // Verifica se cada item em 'data' possui as propriedades esperadas
      res.body.data.forEach(item => {
        expect(item).to.have.property('nroIntAlu').that.is.a('number');
        expect(item).to.have.property('nomeAlu').that.is.a('string');
      });
    });
  });
});
