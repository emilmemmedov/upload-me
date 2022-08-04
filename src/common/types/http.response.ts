export interface IHttpResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export class HttpResponse {
  public static build<T>(
    data: T,
    message = 'Ok',
    success = true,
  ): IHttpResponse<T> {
    return {
      success: success,
      message: message,
      data: data,
    };
  }
}
