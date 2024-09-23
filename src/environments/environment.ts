import { LogLevel, } from 'angular-auth-oidc-client';

export const environment = {
  production: true,
  // Configurações Aplicação:
  clientUrl: 'http://localhost:4200',
  apiUrl: 'http://localhost',
  soeauth: {
    authority: 'https://soe.intra.rs.gov.br/soeauth-des/.well-known/openid-configuration',
    clientId: 'apm.i2.des.5Q2MC0k5pwA5Vy1JNfV',
    redirectUrl: "https://apm02.des.intra.rs.gov.br",
    postLogoutRedirectUri: "https://apm02.des.intra.rs.gov.br",
    scope: 'openid',
    responseType: 'code',
    silentRenew: true,
    useRefreshToken: true,
    // logLevel: LogLevel.Debug,
  },
};
