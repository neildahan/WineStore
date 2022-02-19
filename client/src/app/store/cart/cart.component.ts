import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/models/cart-interface';
import { CartItem } from 'src/app/models/cart-item.interface';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  searchTerm: string = ''

  @Input() cart?: Cart | null;
  @Input() totalPrice?: number | null;
  @Output() removeItem = new EventEmitter<CartItem>();

  public activeCart: any
  public cartProducts: any = []
  public products: any = []
  public grandTotal !: number
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res=>{
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    //   this.cartService.getActiveCart().subscribe(res=>{
    //     this.activeCart = res});}
    // )
    console.log(this.activeCart)
  }

  onRemoveItem(item: CartItem) {
    this.removeItem.emit(item)
  }

  removeAllCart() {
    // this.cartService.removeAllCart()
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value
    console.log(this.searchTerm)
    // this.cartService.search.next(this.searchTerm)
  }
}
