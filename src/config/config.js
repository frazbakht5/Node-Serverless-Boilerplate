const dotenv = require('dotenv')
const path = require('path')
const Joi = require('joi')

dotenv.config({ path: path.join(__dirname, '../../.env') })

const envVarsSchema = Joi.object()
  .keys({
    NODE_ENV: Joi.string().valid('production', 'development', 'test').required(),
    PORT: Joi.number().default(5000),
    MONGODB_URL: Joi.string().required().description('Mongo DB url'),
    JWT_SECRET: Joi.string().required().description('JWT secret key'),
    JWT_ACCESS_EXPIRATION_MINUTES: Joi.number().default(30).description('minutes after which access tokens expire'),
    JWT_REFRESH_EXPIRATION_DAYS: Joi.number().default(30).description('days after which refresh tokens expire'),
    JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which reset password token expires'),
    JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number().default(10).description('minutes after which verify email token expires'),
    SMTP_HOST: Joi.string().description('server that will send the emails'),
    SMTP_PORT: Joi.number().description('port to connect to the email server'),
    SMTP_USERNAME: Joi.string().description('username for email server'),
    SMTP_PASSWORD: Joi.string().description('password for email server'),
    EMAIL_FROM: Joi.string().description('the from field in the emails sent by the app'),
  })
  .unknown()

const { value: envVars, error } = envVarsSchema.prefs({ errors: { label: 'key' } }).validate(process.env)

if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

module.exports = {
  env: envVars.NODE_ENV,
  port: envVars.PORT,
  mongoose: {
    url: envVars.MONGODB_URL + (envVars.NODE_ENV === 'test' ? '-test' : ''),
    options: {
      // useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
  },
  jwt: {
    secret: envVars.JWT_SECRET,
    accessExpirationMinutes: envVars.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: envVars.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: envVars.JWT_RESET_PASSWORD_EXPIRATION_MINUTES,
    verifyEmailExpirationMinutes: envVars.JWT_VERIFY_EMAIL_EXPIRATION_MINUTES,
  },
  email: {
    transporter: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    },
    smtp: {
      host: envVars.SMTP_HOST,
      port: envVars.SMTP_PORT,
      auth: {
        user: envVars.SMTP_USERNAME,
        pass: envVars.SMTP_PASSWORD,
      },
    },
    from: envVars.EMAIL_FROM,
    // dkim: {
    //   domainName: 'example.io',
    //   keySelector: 'key1',
    //   privateKey:
    //     '-----BEGIN RSA PRIVATE KEY-----MIIEpAIBAAKCAQEAggYi/wj5/zmnJeLquqRw0BnmXHGD3L6kpLMwnvZcw+DwqSK02cBypRDDhYqcCjBJh9NGdd2EsuHJGFgHrwpcXCWbEwte6MSl++jSn0CqUrIy4g887xHMZnCPlXh3G0f27xoQS6KqupjUpNyG35Af02V3vzfSC1UDvQrwMuqpCnA1S+x7kTw80ZyC87qsbvCjN8iExTcH8+kKZZFIzG+Afp6doK34C0dpQ7AGZmFCIo7no0cauF8ZIBarJeTjr4Z8kaoLYgPdTiF27j9HN26YSNT1UYjifzP6cCn4LI3iG/7bZXIT/U9Jo1CI4jJvloIuF3iZzlSPMoJnhxZQkzsi+QIDAQABAoIBAFhxGCjl0Dbc3mcU3Jkr9Vh35YuH4yupuZAWGsJlzV+nh8tkQiPDlbfVmUkiqVT812c+PLU7gmGy1vhqGH/lykEbi0n++AXYjRa2nV2ZvMEXWSkPOGFdd+1OLzx6fnneD4c/8UmhUgQupKWnI066WAuQ/0zgCU2P/EUARbY8i9L+22h1UVzNnvPg2CNHaAH2atV9dzfxDxlNyeeIbSB+TG+bo0dgTQZd64nEQwBfJkNnbtJqEo+HwfwZ2JECk0C5Znq2LYZPXO7hZOXBhGMk2CC2UDHHuzIV0gvguK1IojUMuIHnatGxw7Rz7f/nN5jEYbb6tjHTeoo8hDNJosUM/QECgYEAwrBVW2l/+tfs7MH8X9lqur2MCZ1QWNblOkbayvkJ+y+J365Z9JmRyJZauYpOD8fga7Y8mxfhsYA3Qyh4LJ+1SEeAYIy8PNQ3o5aTq4UePnRbOD41Qh4jLhJ26XxizX3ef3z7tXWvtXFUJ/8Fxm3O3PCHkDOFVD/JKWAVsyfcfhECgYEAqviSmfJVbfe2KANp3KlhCP5RT8pCIxGX3YznGCO01YwLqdF1iYt9LVGTqXmY+dqb0aGrCX1O2GydKmNrs+4mRTUJhKEtMQ3bJfxENwuhIevSsD7kPBDkHndL0piXsLIeB65wKbaPqdgaP+bsWE0e/ZxAedOJxoKJ7nqJi2f+jmkCgYEAq3PEx+sB9POBSAOR8Qs0bd4NXE44+vPNDWRmvEdTXe1Am0cdG0a+1wpqPWmqU0VvwwvLFb6TWNEUWcVjB9FiQZQOX3ixMVSm5x7tTyi9OL0ZtE88ccy+qI1EQVz0WgmWD2oO9X/9zGlQdqSk/lmnynTcvcZRjZ9a1WAz3AGnsTECgYBbNIl4SHdcV4W76L5DcbQLCSg1SW9op8z86lqpXPrt5GygZdWuz1Oypk8AXJbHyt/Ov9CvGkLCX4akAy+EZ+nQh4+RSi4CeiLLK7z0JGcL4nKdhJ9aj6QxwHAZYz+gihRNArhg+DvBXj/6kOTJ4jJDFmSq2Lcpx59vMb1IOezo6QKBgQCMa8w7D8WQto1wCPy4lIi0gxdRrjrGJ8084j7Q8l6KmNvzvGCamBDNs5nId0yizboXljk/qqXiEO33Kz/vn+t5sV0JC3z27bg8VbpjCOthFGSakvBDnzhI4RnpeCQK4LsplwGaYvOfuWtpPbWJf6AdKEcZPH7MgwWcV/k0S4oRBA==-----END RSA PRIVATE KEY-----',
    // },
  },
}
