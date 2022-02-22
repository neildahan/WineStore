import { Component, Input, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.interface';
import { CartService } from 'src/app/services/cart.service';



@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  searchQuery: string = '';
  @Input() cartItems?: CartItem[] | any ;
  @Input() totalPrice?: number | null;




  constructor(private cartService: CartService) { }

  ngOnInit(): void {

    console.log(this.cartService.cart$.subscribe(c => console.log(c?.products)))
  }


}
