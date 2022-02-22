import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  cart$ = this.cartService.cart$;
  totalPrice$ = this.cartService.totalPrice$;

  constructor(private cartService: CartService, private orderService: OrderService, private authService: AuthenticationService) { }

  ngOnInit(): void {


  }



  placeOrder(formValue: Order) {
    formValue.userId = this.authService.user?.id;
    formValue.cartId = this.cartService.cart?.id;
    formValue.totalPrice = this.cartService.cart?.products?.map((product) => product.totalPrice)?.reduce((a, b) => a + b, 0)
    this.orderService.createOrder(formValue).subscribe(res =>
      console.log(res)
    )
  }
}

export interface Order {
  userId?: number;
  cartId?: number;
  totalPrice?: number;
  city: string;
  street: string;
  deliveryDate: Date;
  orderDate: Date;
  creditCard: string;
}