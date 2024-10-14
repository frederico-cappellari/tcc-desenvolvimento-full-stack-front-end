export const environment = {
  production: true,
  // Configurações Aplicação:
  clientUrl: 'https://apm02.des.intra.rs.gov.br',
  apiUrl: 'https://apm-quarkus.apps.kildes4830.des.intra.rs.gov.br',

  soeauth: {
    authority: 'https://www.soe.rs.gov.br/soeauth/.well-known/openid-configuration',
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
