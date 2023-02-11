import MainHttpResponse from './MainHttpResponse';

export default class HttpResponse {
  /**
   * This function will modify get success response
   * it will add data key in response to strutured response
   * this function expecting response in paramater
   *
   * @method get
   * @param {object} response
   * @returns {object}
   */
  public static get(response: any): object {
    return MainHttpResponse.get({ data: response });
  }

  /**
   * This function will modify created success response
   * it will add data key in response to strutured response
   * this function expecting response in paramater
   * @method created
   * @param {object} response
   * @returns {object}
   */
  public static created(response: any): object {
    return MainHttpResponse.created({ data: response });
  }

  /**
   * This function will modify deleted success response
   * it will add data key in response to strutured response
   * this function expecting response in paramater
   * @method deleted
   * @param {object} response
   * @returns {object}
   */
  public static deleted(response: any): object {
    return MainHttpResponse.deleted({ data: response });
  }

  /**
   * This function will modify updated success response
   * it will add data key in response to strutured response
   * this function expecting response in paramater
   * @method updated
   * @param {object} response
   * @returns {object}
   */
  public static updated(response: any): object {
    return MainHttpResponse.updated({ data: response });
  }
}
