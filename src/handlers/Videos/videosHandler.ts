import { formatJSONResponse } from '@libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import NotFound from 'src/modules/Errors/NotFound';
import HttpResponse from 'src/modules/Response/HttpResponse';
import { connectToDatabase } from 'src/models';
import validator from '../../validations/validate';
import { videoSchema, videoUpdaateSchema } from './schema';
import VideoService from './service';

export const getAllVideo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const Videos = await VideoService.getAllVideo();
      if (Videos && Object.keys(Videos).length > 0) {
        return formatJSONResponse(HttpResponse.get(Videos));
      } else {
        return formatJSONResponse(new NotFound('Video Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
export const getAllByVideoWithCategory = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const Videos = await VideoService.getAllVideobyCategory();
      if (Videos && Object.keys(Videos).length > 0) {
        return formatJSONResponse(HttpResponse.get(Videos));
      } else {
        return formatJSONResponse(new NotFound('Video Not Found').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    console.log(event.body);
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
export const getAllVideobyCatagoryId = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { category_id } = event.pathParameters;
    if (await connectToDatabase()) {
      const Catagorie = await VideoService.getAllVideobyCategoryId(category_id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Video Not Found').getResponse());
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

export const createVideo = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = validator(bodyParams, videoSchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const Catagorie = await VideoService.createVideo(bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.created(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Video Not Found').getResponse());
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

export const getVideoById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id, category_id } = event.pathParameters;
      const Catagorie = await VideoService.getVideobyCategoryId(category_id, id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Category Not Found').getResponse());
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

export const updateVideoById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const bodyParams = JSON.parse(event.body);
      const validate = validator(bodyParams, videoUpdaateSchema);
      if (!validate.validate) {
        return formatJSONResponse(new Forbidden(validate.message).getResponse());
      }
      const Catagorie = await VideoService.updateVideobyId(id, bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.updated(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Category Cant be Update').getResponse());
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

export const deleteVideoById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Catagorie: any = await VideoService.deleteVideobyId(id);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.deleted(Catagorie));
      } else {
        return formatJSONResponse(new Forbidden('Category Cant be delete').getResponse());
      }
    } else {
      return formatJSONResponse(new Forbidden('Error in connect with db').getResponse());
    }
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
