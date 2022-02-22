import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Cart } from 'src/app/models/cart-interface';
import { CartItem } from 'src/app/models/cart-item.interface';
import { User } from 'src/app/models/user.interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {


  searchTerm: string = '';
  @Input() user?: User | null;
  @Input() cart?: Cart | null;
  @Input() totalPrice?: number | null ;
  @Output() removeItem = new EventEmitter<CartItem>();

cartItemQuantity = 0
  user$  = this.authService.user$ ;
  constructor(private cartService: CartService, private authService:AuthenticationService) { }

  ngOnInit(): void {

  }

  onRemoveItem(item: CartItem) {
    this.removeItem.emit(item)
   
  }

  removeAllFromCart(cartId:number) {
    this.cartService.removeAllFromCart(cartId)
    console.log(this.cart?.id)
    console.log(this.cart?.products)
  }

  search(event: any) {
    this.searchTerm = (event.target as HTMLInputElement).value
    console.log(this.searchTerm)
    this.cartService.search.next(this.searchTerm)
  }


  inc(item: CartItem){
    item.quantity ++
    item.totalPrice = item.quantity * item.price
    if(this.totalPrice){
    this.totalPrice = item.price + this.totalPrice}
this.cartService.updateCartItemQty(item)
  }

  dec(item: CartItem){
    if(item.quantity > 1){
      item.quantity --
    item.totalPrice = item.quantity * item.price
    if(this.totalPrice){
    this.totalPrice = this.totalPrice - item.price }
    this.cartService.updateCartItemQty(item)
  }
else if(item.quantity <= 1){
  console.log('no product to decrease')
  this.onRemoveItem(item)
}
}

}
