import { Component, Input, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user$ = this.authService.user$;


  constructor(public authService: AuthenticationService) {

  }


  logout(){
    sessionStorage.clear();
  // this.router.navigateByUrl('/');
  }



  ngOnInit(): void {

  }

}


 