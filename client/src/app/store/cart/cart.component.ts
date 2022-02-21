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
  @Input() totalPrice?: number | null;
  @Output() removeItem = new EventEmitter<CartItem>();


  user$  = this.authService.user$ ;
  // public activeCart: any
  // public cartProducts: any = []
  // public products: any = []
  // public grandTotal !: number
  constructor(private cartService: CartService, private authService:AuthenticationService) { }

  ngOnInit(): void {
    // this.cartService.getProducts().subscribe(res=>{
    //   this.products = res;
    //   this.grandTotal = this.cartService.getTotalPrice();
    //   this.cartService.getActiveCart().subscribe(res=>{
    //     this.activeCart = res});}
    // )
    // console.log(this.activeCart)
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
}
