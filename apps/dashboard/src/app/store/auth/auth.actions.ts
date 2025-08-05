import { createAction, props } from '@ngrx/store';
import { LoginDto, RegisterDto } from '@turbovets-challenge/data/dtos';
import { IAuthErrorResponse, IAuthLoginResponse } from '@turbovets-challenge/data/interfaces';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: LoginDto }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: IAuthLoginResponse }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{error: IAuthErrorResponse}>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ credentials: RegisterDto }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ response: any }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');
