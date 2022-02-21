import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BaseResponse } from '../models/base-response.interface';
import { Credentials } from '../models/credentials.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private userChange = new BehaviorSubject<User | null>(null);
  user$ = this.userChange.asObservable();

  get user() {
    return this.userChange.value;
  }
  constructor(private http:HttpClient) { }

  doLogin(credentials:Credentials): Observable<User> {
    return this.http.post<BaseResponse<User>>(environment.baseUrl + "/users/login", credentials).pipe(
      map((res) => res.data)
    )
  }

  setUser(user: User | null) {
    this.userChange.next(user)
  }

getloggedInUser():Observable<User | undefined>{
  if (sessionStorage.getItem('user')) {
    return of(JSON.parse(sessionStorage.getItem('user') || "") as User)
  }
  return of()
  // return this.http.get<BaseResponse<User>>(environment.baseUrl + "/users/loggedIn").pipe(
  //   map((res) => res.data)
  // )
}


  
}
