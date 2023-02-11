const lambdas = {
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
  getAllCategories: {
    handler: 'src/handlers/Categories/categoriesHandler.getAllCategories',
    events: [
      {
        http: {
          method: 'GET',
          path: '/category/get_all',
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
  createCategory: {
    handler: 'src/handlers/Categories/categoriesHandler.createCategory',
    events: [
      {
        http: {
          method: 'POST',
          path: '/category/add',
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
  getCategoriesById: {
    handler: 'src/handlers/Categories/categoriesHandler.getCategoriesById',
    events: [
      {
        http: {
          method: 'GET',
          path: '/category/{id}',
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
  updateCategoriesById: {
    handler: 'src/handlers/Categories/categoriesHandler.updateCategoriesById',
    events: [
      {
        http: {
          method: 'PUT',
          path: '/category/update/{id}',
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
  deleteCategoriesById: {
    handler: 'src/handlers/Categories/categoriesHandler.deleteCategoriesById',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/category/delete/{id}',
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
  getAllVideo: {
    handler: 'src/handlers/Videos/videosHandler.getAllVideo',
    events: [
      {
        http: {
          method: 'GET',
          path: '/video',
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
  getAllVideoWithCategory: {
    handler: 'src/handlers/Videos/videosHandler.getAllByVideoWithCategory',
    events: [
      {
        http: {
          method: 'GET',
          path: '/video/get_all',
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
  createVideo: {
    handler: 'src/handlers/Videos/videosHandler.createVideo',
    events: [
      {
        http: {
          method: 'POST',
          path: '/video/add',
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
  getVideoById: {
    handler: 'src/handlers/Videos/videosHandler.getVideoById',
    events: [
      {
        http: {
          method: 'GET',
          path: '/video/get_by_cat_id/{category_id}/{id}',
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
  updateVideoById: {
    handler: 'src/handlers/Videos/videosHandler.updateVideoById',
    events: [
      {
        http: {
          method: 'PUT',
          path: '/video/update/{id}',
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
  deleteVideoById: {
    handler: 'src/handlers/Videos/videosHandler.deleteVideoById',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/video/delete/{id}',
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
  getAllSeasons: {
    handler: 'src/handlers/Seasons/seasonsHandler.getAllSeasons',
    events: [
      {
        http: {
          method: 'GET',
          path: '/season',
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
  createSeason: {
    handler: 'src/handlers/Seasons/seasonsHandler.createSeason',
    events: [
      {
        http: {
          method: 'POST',
          path: '/season/add',
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
  getSeasonById: {
    handler: 'src/handlers/Seasons/seasonsHandler.getAllSeasonsByVideoId',
    events: [
      {
        http: {
          method: 'GET',
          path: '/season/get_all/{video_id}',
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
  getAllSeasonsByid: {
    handler: 'src/handlers/Seasons/seasonsHandler.getAllSeasonsByid',
    events: [
      {
        http: {
          method: 'GET',
          path: '/season/get/{video_id}',
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
  updateSeasonById: {
    handler: 'src/handlers/Seasons/seasonsHandler.updateSeasonById',
    events: [
      {
        http: {
          method: 'PUT',
          path: '/season/update/{id}',
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
  deleteSeasonById: {
    handler: 'src/handlers/Seasons/seasonsHandler.deleteSeasonById',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/season/delete/{id}',
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
  getAllEpisodes: {
    handler: 'src/handlers/Episodes/episodesHandler.getAllEpisodes',
    events: [
      {
        http: {
          method: 'GET',
          path: '/episode/{season_id}',
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
  createEpisode: {
    handler: 'src/handlers/Episodes/episodesHandler.createEpisode',
    events: [
      {
        http: {
          method: 'POST',
          path: '/episode/add',
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
  getEpisodeById: {
    handler: 'src/handlers/Episodes/episodesHandler.getEpisodeById',
    events: [
      {
        http: {
          method: 'GET',
          path: '/episode/get_all/{season_id}/{id}',
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
  updateEpisodeById: {
    handler: 'src/handlers/Episodes/episodesHandler.updateEpisodeById',
    events: [
      {
        http: {
          method: 'PUT',
          path: '/episode/update/{id}',
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
  deleteEpisodeById: {
    handler: 'src/handlers/Episodes/episodesHandler.deleteEpisodeById',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/episode/delete/{id}',
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
  createWatchlater: {
    handler: 'src/handlers/Watchlater/watchlaterHandler.createWatchlater',
    events: [
      {
        http: {
          method: 'POST',
          path: '/watchlater/add',
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
  getWatchlater: {
    handler: 'src/handlers/Watchlater/watchlaterHandler.getWatchlater',
    events: [
      {
        http: {
          method: 'GET',
          path: '/watchlater/get/{user_id}/{page}',
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
  deleteWatchlaterbyId: {
    handler: 'src/handlers/Watchlater/watchlaterHandler.deleteWatchlaterbyId',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/watchlater/delete/{id}',
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
  createPauseResume: {
    handler: 'src/handlers/PauseResume/pauseResumeHandler.createPauseResume',
    events: [
      {
        http: {
          method: 'POST',
          path: '/pause_resume/add',
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
  getAllPauseResume: {
    handler: 'src/handlers/PauseResume/pauseResumeHandler.getAllPauseResume',
    events: [
      {
        http: {
          method: 'GET',
          path: '/pause_resume/get/{user_id}/{video_id}',
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
  deletePauseResumeById: {
    handler: 'src/handlers/PauseResume/pauseResumeHandler.deletePauseResumeById',
    events: [
      {
        http: {
          method: 'DELETE',
          path: '/pause_resume/delete/{id}',
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
  paymentUrl: {
    handler: 'src/handlers/Payment/paymentHandler.paymentUrl',
    events: [
      {
        http: {
          method: 'GET',
          path: '/payment/url',
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
  webhook: {
    handler: 'src/handlers/Payment/paymentHandler.webhook',
    events: [
      {
        http: {
          method: 'POST',
          path: '/payment/webhook',
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
