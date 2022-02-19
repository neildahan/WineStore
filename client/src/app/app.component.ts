import { Component } from '@angular/core';
import { filter, switchMap, take } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private cartService:CartService) { }

  ngOnInit() {

    this.authService.getloggedInUser().subscribe(user => {
      console.log(user)
      this.authService.setUser(user || null);
    })

    this.authService.user$.pipe(
      filter(user => user != null),
      switchMap(user => this.cartService.getCart(user?.id))
    ).subscribe()


  }


}
