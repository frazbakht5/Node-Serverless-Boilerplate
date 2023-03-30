import 'source-map-support/register';
import { formatJSONResponse } from '../../libs/apiGateway';
import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import InternalServer from 'src/modules/Errors/InternalServer';

export const test = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    return formatJSONResponse({ msg: 'Lambda is working!' });
  } catch (error: any) {
    return formatJSONResponse(new InternalServer(error).getResponse());
  }
};
