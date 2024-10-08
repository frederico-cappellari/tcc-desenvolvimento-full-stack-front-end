export const environment = {
  production: false,
  // Configurações Aplicação:
  clientUrl: 'https://apm02.des.intra.rs.gov.br',
  apiUrl: 'https://apm02.des.intra.rs.gov.br:3000',

  soeauth: {
    authority: 'https://soe.intra.rs.gov.br/soeauth-des/.well-known/openid-configuration',
    clientId: 'apm.i2.des.5Q2MC0k5pwA5Vy1JNfV',
    redirectUrl: "https://apm02.des.intra.rs.gov.br",
    postLogoutRedirectUri: "https://apm02.des.intra.rs.gov.br",
    scope: 'openid',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },
  mapsKey: 'AIzaSyAsPR982x3S-7a8SSHJzgIiUrnWU1c82X0',
};
