import { BaseResponse, IResponse } from './BaseResponse';

class InternalServer extends BaseResponse {
  public code: number;
  public message: string;
  public data: string[];
  constructor(message: string, code = 500, data = []) {
    super(message, code, data);
    Object.setPrototypeOf(this, InternalServer.prototype);
  }

  getResponse = (): IResponse => {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  };
}

export default InternalServer;
