import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  infoMessage: string =''
  constructor(private authService : AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        if(params['registered'] !== undefined && params['registered'] === 'true') {
            this.infoMessage = 'Registration Successful! Please Login!';
        }
      });

  }

onSubmit(email: string, password: string){
  this.authService.doLogin({email, password}).subscribe(user => {
    sessionStorage.setItem('user', JSON.stringify(user))
    this.authService.setUser(user);
  })
}
}
