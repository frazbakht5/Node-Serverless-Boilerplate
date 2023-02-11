import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import NotFound from 'src/modules/Errors/NotFound';
import HttpResponse from 'src/modules/Response/HttpResponse';
import { connectToDatabase } from 'src/models';
import validator from '../../validations/validate';
import WatchlaterService from './service';
import { addSchema } from './schema';
import VideoService from '../Videos/service';
import UserService from '../Authentication/userService';

export const getAllWatchlater = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { user_id, page } = event.pathParameters;
    if (await connectToDatabase()) {
      const Catagorie = await WatchlaterService.getWatchlater(user_id, parseInt(page) ?? 0);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Watchlater Not Found').getResponse());
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

export const createWatchlater = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
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
          const Catagorie = await WatchlaterService.createWatchlater(bodyParams);
          if (Catagorie && Object.keys(Catagorie).length > 0) {
            return formatJSONResponse(HttpResponse.created(Catagorie));
          } else {
            return formatJSONResponse(new NotFound('Watchlater Not Found').getResponse());
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

export const deleteWatchlaterById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Watchlater: any = await WatchlaterService.deleteWatchlaterbyId(id);
      if (Watchlater && Object.keys(Watchlater).length > 0) {
        return formatJSONResponse(HttpResponse.deleted(Watchlater));
      } else {
        return formatJSONResponse(new Forbidden('Watchlater Cant be delete').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
