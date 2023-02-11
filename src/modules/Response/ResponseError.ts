import BadRequest from '../../modules/Errors/BadRequest';
import { BaseResponse } from '../../modules/Errors/BaseResponse';
import Forbidden from '../../modules/Errors/Forbidden';
import InternalServer from '../../modules/Errors/InternalServer';
import NotFound from '../../modules/Errors/NotFound';
import Unauthorized from '../../modules/Errors/Unauthorized';

const ResponseError = {
  BadRequest,
  BaseResponse,
  Forbidden,
  InternalServer,
  NotFound,
  Unauthorized,
};

export default ResponseError;
