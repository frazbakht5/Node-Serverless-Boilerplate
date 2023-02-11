import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import NotFound from 'src/modules/Errors/NotFound';
import HttpResponse from 'src/modules/Response/HttpResponse';
import { connectToDatabase } from 'src/models';
import validator from '../../validations/validate';
import EpisodeService from './service';
import { episodeSchema, episodeUpdaateSchema } from './schema';

/**
 * @param {object} req
 * @param {object} res
 * @param {function} next
 */
export const getAllEpisodes = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { season_id } = event.pathParameters;
    if (await connectToDatabase()) {
      const Catagorie = await EpisodeService.getEpisodesbyId(season_id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Episode Not Found').getResponse());
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
export const createEpisode = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = validator(bodyParams, episodeSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const Catagorie = await EpisodeService.createEpisode(bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.created(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Episode Not Found').getResponse());
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
export const getEpisodeById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id, season_id } = event.pathParameters;
      const Catagorie = await EpisodeService.getEpisodebySeasonId(season_id, id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Episode Not Found').getResponse());
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
export const updateEpisodeById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const bodyParams = JSON.parse(event.body);
      const validate = validator(bodyParams, episodeUpdaateSchema);
      if (!validate.validate) {
        return formatJSONResponse(new Forbidden(validate.message).getResponse());
      }
      const Catagorie = await EpisodeService.updateEpisodebyId(id, bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.updated(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Episode Cant be Update').getResponse());
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
export const deleteEpisodeById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Catagorie: any = await EpisodeService.deleteEpisodebyId(id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.deleted(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Episode Cant be delete').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
