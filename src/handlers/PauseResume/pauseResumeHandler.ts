import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import NotFound from 'src/modules/Errors/NotFound';
import HttpResponse from 'src/modules/Response/HttpResponse';
import { connectToDatabase } from 'src/models';
import validator from '../../validations/validate';
import PauseResumeService from './service';
import { addSchema } from './schema';
import VideoService from '../Videos/service';
import UserService from '../Authentication/userService';

export const getAllPauseResume = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { user_id, video_id } = event.pathParameters;
    if (await connectToDatabase()) {
      const Catagorie = await PauseResumeService.getPauseResume(user_id, video_id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('PauseResume Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */

export const createPauseResume = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = validator(bodyParams, addSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const user = await UserService.getUsersById(bodyParams.user_id);
      if (user && Object.keys(user).length > 0) {
        const video = await VideoService.getVideobyId(bodyParams.video_id);
        if (video && Object.keys(video).length > 0) {
          const Catagorie = await PauseResumeService.createPauseResume(bodyParams);
          if (Catagorie && Object.keys(Catagorie).length > 0) {
            return formatJSONResponse(HttpResponse.created(Catagorie));
          } else {
            return formatJSONResponse(new NotFound('PauseResume Not Found').getResponse());
          }
        } else {
          return formatJSONResponse(new NotFound('Video Against Id Not Found').getResponse());
        }
      } else {
        return formatJSONResponse(new NotFound('User Against Id Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */

export const deletePauseResumeById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const PauseResume: any = await PauseResumeService.deletePauseResumebyId(id);
      if (PauseResume && Object.keys(PauseResume).length > 0) {
        return formatJSONResponse(HttpResponse.deleted(PauseResume));
      } else {
        return formatJSONResponse(new Forbidden('PauseResume Cant be delete').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
