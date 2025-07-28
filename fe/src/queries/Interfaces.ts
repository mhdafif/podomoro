export interface IError<T = any> {
  message: string;
  code?: string;
  data?: T;
}

export interface IResponse<T = any> {
  message: string;
  code?: string;
  data?: T;
}
