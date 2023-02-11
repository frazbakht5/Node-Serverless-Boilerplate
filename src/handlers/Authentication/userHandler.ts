import 'source-map-support/register';
import { connectToDatabase } from '../../models';
import { formatJSONResponse } from '../../libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { compare } from 'bcryptjs';
import { generateAccessToken, generateRefreshAccessToken, verifyRefreshAccessToken } from 'src/service/Authorization';
import HttpResponse from 'src/modules/Response/HttpResponse';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import UsersService from 'src/handlers/Authentication/userService';
import {
  changePasswordSchema,
  codeSchema,
  forgetPasswordSchema,
  loginSchema,
  refreshTokenSchema,
  registerSchema,
  updateProfileSchema,
} from './schema';
import Validator from '../../validations/validate';
import Unauthorized from 'src/modules/Errors/Unauthorized';
import NotFound from 'src/modules/Errors/NotFound';
import sendEmail from 'src/providers/Email';
import { encrypt, getSixDigitCode } from 'src/service/encyption';
import BadRequest from 'src/modules/Errors/BadRequest';
const url = 'http://localhost:4200/';

export const authCodeGenerate = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { email } = event.queryStringParameters;
    if (!email) {
      return formatJSONResponse(new Forbidden('Please Provide email in query String Parameters').getResponse());
    }
    if (await connectToDatabase()) {
      const userInfo = await UsersService.getAnyUsersByEmail(email);
      if (userInfo && Object.keys(userInfo).length > 0) {
        const code = await getSixDigitCode();
        if (code) {
          await UsersService.updateUsersById(userInfo._id, { auth_code: code });
          await sendEmail(email, 'Verification Code', '<b>Enter this code to Here</b> <br /> <b>' + code + '</b>');
          return formatJSONResponse(HttpResponse.created({ message: 'please verify your email account' }));
        } else {
          // if not match
          return formatJSONResponse(new Forbidden('Error in code Generate').getResponse());
        }
      } else {
        // if not account found
        return formatJSONResponse(new Forbidden('Invalid request').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const authCodeVerification = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    console.log(event);

    const validate = Validator(bodyParams, codeSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const userInfo = await UsersService.getAnyUsersByEmail(bodyParams.email);
      if (userInfo && Object.keys(userInfo).length > 0) {
        if (userInfo.auth_code !== bodyParams.auth_code) {
          return formatJSONResponse(new Forbidden('Invalid Code').getResponse());
        }
        const now = new Date();
        const userval = new Date(userInfo.updateAt);
        console.log(userInfo);

        console.log((now.getTime() - userval.getTime()) / 1000);

        if (now.getSeconds() - userval.getSeconds() + 300) {
          const info = {
            _id: userInfo._id,
            name: userInfo.full_name,
            email: userInfo.email,
          };
          const value = await UsersService.updateUsersById(userInfo._id, { is_active: true });

          const token = await generateAccessToken(info);
          const refreshToken = await generateRefreshAccessToken(info);
          if (token && refreshToken) {
            const userData = {
              id: value._id,
              name: value.full_name,
              email: value.email,
              accessToken: token,
              refreshToken: refreshToken,
            };
            return formatJSONResponse(HttpResponse.created(userData));
          } else {
            return formatJSONResponse(new Forbidden('Invalid Code').getResponse());
          }
        } else {
          // if not match
          return formatJSONResponse(new Forbidden('Code Expired!').getResponse());
        }
      } else {
        // if not account found
        return formatJSONResponse(new Forbidden('Invalid request').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const login = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = Validator(bodyParams, loginSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const userInfo = await UsersService.getUsersByEmail(bodyParams.email);
      if (userInfo && Object.keys(userInfo).length > 0) {
        if (userInfo.password) {
          const match = await compare(bodyParams.password, userInfo.password);
          if (match) {
            const info = {
              _id: userInfo._id,
              name: userInfo.full_name,
              email: userInfo.email,
            };
            const token = await generateAccessToken(info);
            const refreshToken = await generateRefreshAccessToken(info);
            if (token && refreshToken) {
              const userData = {
                id: userInfo._id,
                name: userInfo.full_name,
                email: userInfo.email,
                accessToken: token,
                refreshToken: refreshToken,
              };
              return formatJSONResponse(HttpResponse.created(userData));
            } else {
              return formatJSONResponse(new Forbidden('Invalid Password').getResponse());
            }
          } else {
            // if not match
            return formatJSONResponse(new Forbidden('Invalid Username and Password').getResponse());
          }
        } else {
          /// udefined password
          return formatJSONResponse(new Forbidden('Invalid Password').getResponse());
        }
      } else {
        // if not account found
        return formatJSONResponse(new Forbidden('Invalid Username and Password').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const register = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = Validator(bodyParams, registerSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      console.log(bodyParams);
      const userInfo = await UsersService.getAnyUsersByEmail(bodyParams.email);
      if (userInfo && Object.keys(userInfo).length > 0) {
        if (userInfo.is_active) {
          return formatJSONResponse(new Forbidden('Account Already Exists. Please Login to Continue.').getResponse());
        } else {
          const code = await getSixDigitCode();
          if (code) {
            await UsersService.updateUsersById(userInfo._id, { auth_code: code });
            await sendEmail(
              userInfo.email,
              'Verification Code',
              '<b>Enter this code to Here</b> <br /> <b>' + code + '</b>',
            );
            return formatJSONResponse(
              new BadRequest('Account Already Exists Please check your email and verify code').getResponse(),
            );
          } else {
            // if not match
            return formatJSONResponse(new Forbidden('Error in code Generate').getResponse());
          }
        }
      } else {
        const hasedPassword = await UsersService.getHashedPassword(bodyParams.password);
        if (hasedPassword) {
          const insertResult = await UsersService.createUsers({ ...bodyParams, password: hasedPassword });
          if (insertResult && Object.keys(insertResult).length > 0) {
            const code = await getSixDigitCode();
            if (code) {
              await UsersService.updateUsersById(insertResult._id, { auth_code: code });
              await sendEmail(
                bodyParams.email,
                'Verification Code',
                '<b>Enter this code to Here</b> <br /> <b>' + code + '</b>',
              );
              return formatJSONResponse(HttpResponse.created({ message: 'please verify your email' }));
            } else {
              // if not match
              return formatJSONResponse(new Forbidden('Error in code Generate').getResponse());
            }
          } else {
            return formatJSONResponse(new InternalServer("User Can't be Created").getResponse());
          }
        } else {
          return formatJSONResponse(new Forbidden('Invalid Password').getResponse());
        }
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(error);

    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const forgetPassword = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = Validator(bodyParams, forgetPasswordSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    const email = bodyParams.email;
    if (await connectToDatabase()) {
      const userInfo = await UsersService.getUsersByEmail(email.toLowerCase());
      if (userInfo && Object.keys(userInfo).length > 0) {
        await sendEmail(
          email,
          'Reset Password',
          '<b >Press here to set password <a href=' +
          url +
          '/reset?email=' +
          (await encrypt({ email: email })) +
          '>Here</a></b>',
        );
        return formatJSONResponse(HttpResponse.get('success'));
      } else {
        return formatJSONResponse(new Forbidden('Cannot Put Request').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const resetPassword = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const validate = Validator(body, loginSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const hasedPassword = await UsersService.getHashedPassword(body.password);
      const user = await UsersService.getUsersByEmail(body.email);
      if (user && hasedPassword) {
        const updatebody = { password: hasedPassword };
        const update = await UsersService.updateUsersById(user._id, updatebody);
        if (update) {
          await sendEmail(body.email, 'Successfully Reset Password', '<p>Successfully Reset Password password</p>');
          return formatJSONResponse(HttpResponse.updated(update));
        } else {
          return formatJSONResponse(new InternalServer('Internal Server Error.').getResponse());
        }
      } else {
        return formatJSONResponse(new InternalServer('Internal Server Error.').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const changePassword = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const body = JSON.parse(event.body);
    const validate = Validator(body, changePasswordSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const { email }: any = body;
      const userInfo = await UsersService.getUsersByEmail(email.toLowerCase());
      if (userInfo && Object.keys(userInfo).length > 0) {
        const match = await compare(body.oldPassword, userInfo.password);
        if (match) {
          const hasedPassword = await UsersService.getHashedPassword(body.newPassword);
          if (hasedPassword) {
            const updatebody = { password: hasedPassword };
            const update = await UsersService.updateUsersById(userInfo._id.toString(), updatebody);
            if (update) {
              return formatJSONResponse(HttpResponse.updated(update));
            } else {
              return formatJSONResponse(new InternalServer('Internal Server Error.').getResponse());
            }
          } else {
            return formatJSONResponse(new InternalServer('Internal Server Error.').getResponse());
          }
        } else {
          return formatJSONResponse(new Forbidden('invalid request Please try Again').getResponse());
        }
      } else {
        return formatJSONResponse(new Forbidden('Invalid Old Password').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const refreshToken = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = Validator(bodyParams, refreshTokenSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const userInfo = await UsersService.getUsersByEmail(bodyParams.email.toLowerCase());
      if (userInfo && Object.keys(userInfo).length > 0) {
        const verified = await verifyRefreshAccessToken(
          bodyParams.refreshToken ? bodyParams.refreshToken.toString() : '',
        );
        if (verified?.data) {
          const token = await generateAccessToken(userInfo);
          const refreshToken = await generateRefreshAccessToken(userInfo);
          if (token && refreshToken) {
            const userData = {
              Id: userInfo._id,
              name: userInfo.full_name,
              accessToken: token,
              refreshToken: refreshToken,
            };
            return formatJSONResponse(HttpResponse.get(userData));
          } else {
            return formatJSONResponse(new Unauthorized('Unauthorized').getResponse());
          }
        } else {
          return formatJSONResponse(new Unauthorized('Unauthorized').getResponse());
        }
      } else {
        return formatJSONResponse(new Unauthorized('Unauthorized').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const updateProfile = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const id = event.pathParameters.id;

    const validate = Validator(bodyParams, updateProfileSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const userInfo = await UsersService.updateUsersById(id, bodyParams);
      if (userInfo && Object.keys(userInfo).length > 0) {
        return formatJSONResponse(HttpResponse.get(userInfo));
      } else {
        return formatJSONResponse(new NotFound('Users Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

export const getUser = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const userInfo = await UsersService.getUsers(id);
      if (userInfo && Object.keys(userInfo).length > 0) {
        return formatJSONResponse(HttpResponse.get(userInfo));
      } else {
        return formatJSONResponse(new NotFound('Users Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
