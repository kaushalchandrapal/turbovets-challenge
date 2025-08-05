
export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthLoginResponse {
  access_token: string;
}

export interface IAuthErrorDetail {
  message: string;
  error: string;
  statusCode: number;
}

export interface IAuthErrorResponse {
  statusCode: number;
  message: IAuthErrorDetail;
}