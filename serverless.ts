import type { AWS } from '@serverless/typescript';
import lambdas from './src/handlers/index';

const serverlessConfiguration: AWS = {
  service: 'serverless',
  frameworkVersion: '3',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
    // customDomain: {
    //   domainName: 'api.llv.info',
    //   stage: 'dev',
    //   basePath: 'api',
    //   certificateName: 'www.llv.info',
    //   createRoute53Record: true,
    //   endpointType: 'regional',
    //   securityPolicy: 'tls_1_2',
    //   apiType: 'rest',
    //   autoDomain: false,
    // },
  },
  // plugins: ['serverless-webpack', 'serverless-offline', 'serverless-prune-plugin', 'serverless-domain-manager'], // only if we have domain
  plugins: ['serverless-webpack', 'serverless-offline', 'serverless-prune-plugin'],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_ENV: 'dev',
    },
    lambdaHashingVersion: '20201221',
  },
  // import the function via paths
  functions: lambdas,
};

module.exports = serverlessConfiguration;
