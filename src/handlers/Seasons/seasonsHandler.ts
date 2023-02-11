import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import NotFound from 'src/modules/Errors/NotFound';
import HttpResponse from 'src/modules/Response/HttpResponse';
import { connectToDatabase } from 'src/models';
import validator from '../../validations/validate';
import { seasonSchema, seasonUpdaateSchema } from './schema';
import SeasonService from './service';

export const getAllSeasons = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const Season = await SeasonService.getAllSeason();
      if (Season && Object.keys(Season).length > 0) {
        return formatJSONResponse(HttpResponse.get(Season));
      } else {
        return formatJSONResponse(new NotFound('Season Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
export const getAllSeasonsByid = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { video_id } = event.pathParameters;
      const Season = await SeasonService.getSeasonsbyVideoId(video_id);
      if (Season && Object.keys(Season).length > 0) {
        return formatJSONResponse(HttpResponse.get(Season));
      } else {
        return formatJSONResponse(new NotFound('Season Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
export const getAllSeasonsByVideoId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { video_id } = event.pathParameters;
      const Season = await SeasonService.getSeasonsbyId(video_id);
      if (Season && Object.keys(Season).length > 0) {
        return formatJSONResponse(HttpResponse.get(Season));
      } else {
        return formatJSONResponse(new NotFound('Season Not Found').getResponse());
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

export const createSeason = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = validator(bodyParams, seasonSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const Catagorie = await SeasonService.createSeason(bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.created(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Season Not Found').getResponse());
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

export const getSeasonById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id, video_id } = event.pathParameters;
      const Catagorie = await SeasonService.getSeasonbyVideoId(video_id, id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Season Not Found').getResponse());
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

export const updateSeasonById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const bodyParams = JSON.parse(event.body);
      const validate = validator(bodyParams, seasonUpdaateSchema);
      if (!validate.validate) {
        return formatJSONResponse(new Forbidden(validate.message).getResponse());
      }
      const Catagorie = await SeasonService.updateSeasonbyId(id, bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.updated(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Season Cant be Update').getResponse());
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

export const deleteSeasonById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Catagorie: any = await SeasonService.deleteSeasonbyId(id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.deleted(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Season Cant be delete').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
