export class BaseResponse extends Error {
  public code: number;
  public message: string;
  public data: string[];

  constructor(message: string, code = 500, data = []) {
    super(message);
    this.message = message;
    this.code = code;
    this.data = data;

    Object.setPrototypeOf(this, BaseResponse.prototype);
  }

  getResponse = (): IResponse => {
    return {
      code: this.code,
      message: this.message,
      data: this.data,
    };
  };
}

export interface IResponse {
  code: number;
  message: string;
  data: string[];
}
// : Promise<Response<any, Record<string, any>> | undefined>
