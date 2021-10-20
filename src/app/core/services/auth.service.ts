import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public logIn(email, pass): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const body = {
      email,
      password: pass
    };

    return this.http.post('http://localhost:3000/api/login', body, options);
  }

  public createNewAcc(email: string, pass: string): Observable<any> {
    const options = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };
    const body = {
      user: {
        id: Math.floor(Math.random() * new Date().getTime()),
        email,
        password: pass,
        type: 'user'
      }
    };
    return this.http.post('http://localhost:3000/api/newUser', body, options);
  }

  public getUser(): Observable<User> {
    const options = {
      headers: {
        contentType: 'application/json',
        id: '1323340309631'
      }
    };

    return this.http.get<User>('http://localhost:3000/api/getUser', options);
  }
}
