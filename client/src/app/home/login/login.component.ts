import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 

  constructor(private authService : AuthenticationService) { }

  ngOnInit(): void {
  }

onSubmit(email: string, password: string){
  this.authService.doLogin({email, password}).subscribe(user => {
    sessionStorage.setItem('user', JSON.stringify(user))
    this.authService.setUser(user);
  })
}
}
