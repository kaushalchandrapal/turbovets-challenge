import { createReducer, on } from '@ngrx/store';
import { loginSuccess, logout, loginFailure } from './auth.actions';
import { User } from '@turbovets-challenge/data/entities'; // adjust path if needed
import { IAuthErrorResponse } from '@turbovets-challenge/data/interfaces';

export interface AuthState {
  user: User | null;
  token: string | null;
  error: IAuthErrorResponse | null;
  isAuthenticated: boolean;
  loading: boolean;
}

export const initialAuthState: AuthState = {
  user: null,
  token: null,
  error: null,
  isAuthenticated: false,
  loading: false,
};

export const authReducer = createReducer(
  initialAuthState,

  on(loginSuccess, (state, { response }) => ({
    ...state,
    access_token: response.access_token,
    error: null,
    isAuthenticated: true,
  })),

  on(loginFailure, (state, { error }: { error: IAuthErrorResponse }) => ({
    ...state,
    error,
    user: null,
    token: null,
    isAuthenticated: false,
  })),

  on(logout, () => initialAuthState)
);
