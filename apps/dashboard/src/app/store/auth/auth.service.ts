import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '@turbovets-challenge/data/entities';
import { IAuthLoginRequest, IAuthLoginResponse } from '@turbovets-challenge/data/interfaces/auth.interface';
import { environment } from '../../environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<IAuthLoginResponse> {
    const body: IAuthLoginRequest = { email, password };
    return this.http.post<IAuthLoginResponse>(`${this.apiUrl}/login`, body);
  }

  register(payload: {
    name: string;
    email: string;
    password: string;
    role: string;
    organizationId: string;
  }): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/register`, payload);
  }
}
