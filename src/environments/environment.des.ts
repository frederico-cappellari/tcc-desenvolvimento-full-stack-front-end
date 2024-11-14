export const environment = {
  production: false,
  // Configurações Aplicação:
  clientUrl: 'https://apm02.des.intra.rs.gov.br',
  apiUrl: 'https://apm-quarkus.apps.kildes4830.des.intra.rs.gov.br',

  soeauth: {
    configId: 'soeAuthConfig',
    authority: 'https://soe.intra.rs.gov.br/soeauth-des/.well-known/openid-configuration',
    clientId: 'apm.i2.des.5Q2MC0k5pwA5Vy1JNfV',
    redirectUrl: "https://apm02.des.intra.rs.gov.br",
    postLogoutRedirectUri: "https://apm02.des.intra.rs.gov.br",
    scope: 'openid',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
  },

  loginCidadao: {
    configId: 'loginCidadaoConfig',
    authority: 'https://meu.hml.rs.gov.br/.well-known/openid-configuration',
    clientId: '530_re15h32dv7kws04s044gwo8o40kc4g8gw0kcsgo48cw4cossk',
    scope: 'openid',
    responseType: 'code',
    redirectUrl: "https://apm02.des.intra.rs.gov.br",
    postLogoutRedirectUri: "https://apm02.des.intra.rs.gov.br/login",
  },

  mapsKey: 'AIzaSyAsPR982x3S-7a8SSHJzgIiUrnWU1c82X0',
};
