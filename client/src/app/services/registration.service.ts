import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }

addNewUser(user: User) {
  console.log(user)
  return this.http.post(environment.baseUrl + "/users/register/", user).pipe(
    map(res => {
      return res
    })
    )
}


}



