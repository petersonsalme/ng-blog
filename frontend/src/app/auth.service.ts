import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(name: string, password: string): Observable<any> {
    return this.http.post<any>(environment.apiUrl + '/login', { name, password });
  }

  auth(): Observable<boolean> {
    const token  = (typeof localStorage) ? localStorage.getItem('token') : '';
    return this.http.post<boolean>(environment.apiUrl + '/auth', { token });
  }
}
