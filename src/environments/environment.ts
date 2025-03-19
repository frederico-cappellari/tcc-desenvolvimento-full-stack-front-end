import { LogLevel, } from 'angular-auth-oidc-client';

export const environment = {
  production: false,
  // Configurações Aplicação:
  clientUrl: 'http://localhost:4200',
  apiUrl: 'https://apm.hml.intra.rs.gov.br',
  soeauth: {
    configId: 'soeAuthConfig',
    authority: 'https://soe.intra.rs.gov.br/soeauth-des/.well-known/openid-configuration',
    clientId: 'apm.i2.des.5Q2MC0k5pwA5Vy1JNfV',
    redirectUrl: "http://localhost:4200/exemplo/lista",
    postLogoutRedirectUri: "http://localhost:4200",
    scope: 'openid',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    // logLevel: LogLevel.Debug,
  },

  loginCidadao: {
    configId: 'loginCidadaoConfig',
    authority: 'https://meu.hml.rs.gov.br/.well-known/openid-configuration',
    clientId: '530_re15h32dv7kws04s044gwo8o40kc4g8gw0kcsgo48cw4cossk',
    scope: 'openid',
    responseType: 'code',
    redirectUrl: 'http://localhost:4200',
    postLogoutRedirectUri: 'http://localhost:4200/login'
  },
  mapsKey: 'AIzaSyAsPR982x3S-7a8SSHJzgIiUrnWU1c82X0',
};