import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { connectToDatabase } from 'src/models';
import CategoriesService from './service';
import validator from '../../validations/validate';
import { formatJSONResponse } from '@libs/apiGateway';
import HttpResponse from 'src/modules/Response/HttpResponse';
import NotFound from 'src/modules/Errors/NotFound';
import Forbidden from 'src/modules/Errors/Forbidden';
import InternalServer from 'src/modules/Errors/InternalServer';
import { categorySchema, categoryUpdaateSchema } from './schema';

export const getAllCategories = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const Catagorie = await CategoriesService.getAllCategories();
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.get(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Categories Not Found').getResponse());
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

export const createCategory = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const bodyParams = JSON.parse(event.body);
    const validate = validator(bodyParams, categorySchema);
    if (!validate.validate) {
      return formatJSONResponse(new Forbidden(validate.message).getResponse());
    }
    if (await connectToDatabase()) {
      const Catagorie = await CategoriesService.createCategories(bodyParams);
      if (Catagorie && Object.keys(Catagorie).length > 0) {
        return formatJSONResponse(HttpResponse.created(Catagorie));
      } else {
        return formatJSONResponse(new NotFound('Categories Not Found').getResponse());
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

export const getCategoriesById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Catagorie = await CategoriesService.getCategoriesById(id);
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

export const updateCategoriesById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const bodyParams = JSON.parse(event.body);
      const validate = validator(bodyParams, categoryUpdaateSchema);
      if (!validate.validate) {
        return formatJSONResponse(new Forbidden(validate.message).getResponse());
      }
      console.log(id, bodyParams);

      const Catagorie = await CategoriesService.updateCategoriesById(id, bodyParams);
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

export const deleteCategoriesById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    if (await connectToDatabase()) {
      const { id } = event.pathParameters;
      const Catagorie: any = await CategoriesService.deleteCategoriesById(id);
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
