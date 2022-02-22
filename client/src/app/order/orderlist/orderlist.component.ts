import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart-interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {


  @Input() cart?: Cart | null;
  @Input() totalPrice?: number | null;

  constructor() { }

  ngOnInit(): void {

  }

}
