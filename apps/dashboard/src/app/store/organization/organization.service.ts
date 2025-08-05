import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '@turbovets-challenge/data/entities';
import { Observable } from 'rxjs';
import { environment } from '../../environment'; // adjust path

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  private apiUrl = `${environment.apiUrl}/organizations`;

  constructor(private http: HttpClient) {}

  getAllOrganizations(): Observable<Organization[]> {
    return this.http.get<Organization[]>(this.apiUrl);
  }
}
