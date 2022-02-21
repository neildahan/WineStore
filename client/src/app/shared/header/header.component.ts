import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$ = this.authService.user$;


  constructor(public authService: AuthenticationService, private router: Router) {

  }


  logout(){
    sessionStorage.removeItem('user');
    this.authService.setUser(null)
    // this.router.navigateByUrl('/');
  }



  ngOnInit(): void {

  }

}


 