type DataResponse<T> = {
  message?: string;
  code?: number;
} & T;

class MainHttpResponse {
  /**
   * Jawad bhai please add data key over here
   * Base Response
   * @param dataResponse
   * @returns
   */
  private static baseResponse<T>(dataResponse: DataResponse<T>): {
    code: number;
    message: string;
  } & Omit<DataResponse<T>, 'message' | 'code'> {
    const { message = 'Success', code = 200, ...rest } = dataResponse;
    return {
      code,
      message,
      ...rest,
    };
  }

  /**
   * Response Get or Sucess
   * @param dataResponse
   * @returns
   */
  public static get<T>(dataResponse: DataResponse<T>): {
    code: number;
    message: string;
  } & Omit<DataResponse<T>, 'message' | 'code'> {
    return this.baseResponse(dataResponse);
  }

  /**
   * Response Created
   * @param dataResponse
   * @returns
   */
  public static created<T>(dataResponse: DataResponse<T>): {
    code: number;
    message: string;
  } & Omit<DataResponse<T>, 'message' | 'code'> {
    return this.baseResponse({
      code: 201,
      message: 'Success',
      ...dataResponse,
    });
  }

  /**
   * Response Updated
   * @param dataResponse
   * @returns
   */
  public static updated<T>(dataResponse: DataResponse<T>): {
    code: number;
    message: string;
  } & Omit<DataResponse<T>, 'message' | 'code'> {
    return this.baseResponse({
      message: 'Success',
      ...dataResponse,
    });
  }

  /**
   * Response Deleted
   * @param dataResponse
   * @returns
   */
  public static deleted<T>(dataResponse: DataResponse<T>): {
    code: number;
    message: string;
  } & Omit<DataResponse<T>, 'message' | 'code'> {
    return this.baseResponse({
      message: 'Success',
      ...dataResponse,
    });
  }
}

export default MainHttpResponse;
