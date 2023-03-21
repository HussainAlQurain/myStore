import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  httpOptions: object = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  user: User = {};

  constructor(private auth: HttpClient) {
    const token = localStorage.getItem('token');
    this._isLoggedIn$.next(!!token);
  }

   createUser(u:User): Observable<User> {
    return this.auth.post<User>('http://localhost:3000/api/users/create', u, this.httpOptions).pipe(
      tap((user: User) => {
        this.user = user;
        const token = user.token;
        if(token){
          localStorage.setItem('token', token);
          this.httpOptions = {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`
          }
          this._isLoggedIn$.next(true);
        }
      })
    )
   }

   login(username: string, password: string): Observable<User>{
    return this.auth.post<User>('http://localhost:3000/api/users/login', {username, password}, this.httpOptions).pipe(
      tap((user: User) => {
        this.user = user;
        const token = user.token;
        if(token) {
          localStorage.setItem('token', token);
          this.httpOptions = {
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${token}`
          }
          this._isLoggedIn$.next(true);
        }
      })
    )
   }
   logout(): void{
    localStorage.clear();
    this._isLoggedIn$.next(false);
   }

}
