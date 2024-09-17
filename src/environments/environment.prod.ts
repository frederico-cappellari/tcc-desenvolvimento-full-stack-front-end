export const environment = {
  production: true,
  // Configurações Aplicação:
  clientUrl: 'http://apm02.des.intra.rs.gov.br',
  apiUrl: 'http://apm02.des.intra.rs.gov.br',

  soeauth: {
    authority: 'https://www.soe.rs.gov.br/soeauth/.well-known/openid-configuration',
    clientId: 'apm.i2.des.5Q2MC0k5pwA5Vy1JNfV',
    redirectUrl: "http://apm02.des.intra.rs.gov.br",
    postLogoutRedirectUri: "http://apm02.des.intra.rs.gov.br",
    scope: 'openid',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
};
