import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {


  cartItemList?:any[]// = this.cartService.cartItemList

  constructor(private cartService:CartService) { }

  ngOnInit(): void {

    console.log
    // (this.cartService.cartItemList)
  }

}
