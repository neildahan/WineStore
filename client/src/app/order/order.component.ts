import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {


  cartItems$ = this.cartService.cart$
  totalPrice$?: Observable<number | undefined>;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {

    this.totalPrice$ = this.cartItems$.pipe(
      map((cart) => cart?.products.map((product) => product.totalPrice).reduce((a: number, b: number) => a + b, 0))
    );

  }

}
