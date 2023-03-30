const lambdas = {
  serverHealth: {
    handler: 'src/handlers/ServerHealth/serverHealthHandler.test',
    events: [
      {
        http: {
          method: 'GET',
          path: '/serverHealth',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  login: {
    handler: 'src/handlers/Authentication/userHandler.login',
    events: [
      {
        http: {
          method: 'POST',
          path: '/login',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  authCodeGenerate: {
    handler: 'src/handlers/Authentication/userHandler.authCodeGenerate',
    events: [
      {
        http: {
          method: 'Get',
          path: '/generate_auth_code',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  authCodeVerification: {
    handler: 'src/handlers/Authentication/userHandler.authCodeVerification',
    events: [
      {
        http: {
          method: 'POST',
          path: '/verify',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  register: {
    handler: 'src/handlers/Authentication/userHandler.register',
    events: [
      {
        http: {
          method: 'POST',
          path: '/register',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  forgetpassword: {
    handler: 'src/handlers/Authentication/userHandler.forgetPassword',
    events: [
      {
        http: {
          method: 'POST',
          path: '/forgetpassword',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  resetpassword: {
    handler: 'src/handlers/Authentication/userHandler.resetPassword',
    events: [
      {
        http: {
          method: 'POST',
          path: '/resetpassword',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  refreshtoken: {
    handler: 'src/handlers/Authentication/userHandler.refreshToken',
    events: [
      {
        http: {
          method: 'POST',
          path: '/refreshtoken',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
  },
  updateprofile: {
    handler: 'src/handlers/Authentication/userHandler.updateProfile',
    events: [
      {
        http: {
          method: 'PUT',
          path: '/updateprofile/{id}',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
  getuser: {
    handler: 'src/handlers/Authentication/userHandler.getUser',
    events: [
      {
        http: {
          method: 'GET',
          path: '/getuser/{id}',
          cors: {
            allowCredentials: true,
            headers: [
              'accesstoken',
              'accessToken',
              'Origin',
              'X-Requested-With',
              'Content-Type',
              'Accept',
              'x-accesstoken',
              'x-access-token',
            ],
            origin: '*',
          },
        },
      },
    ],
    timeout: 30,
  },
};

export default lambdas;
