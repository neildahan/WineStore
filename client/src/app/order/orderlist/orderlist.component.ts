import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart-interface';



@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {

  searchQuery: string = '';


  @Input() cart?: Cart | null;
  @Input() totalPrice?: number | null;

  constructor() { }

  ngOnInit(): void {

  }


}
