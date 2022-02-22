import { Component, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product-interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { EventEmitter } from '@angular/core';
import { Category } from 'src/app/models/category-interface';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/user.interface';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

@Input() user?: User | null;
@Input() categories?: Category[] | null;
@Input() products?: Product[] | null;
@Output() productSelected = new EventEmitter<Product>()

onProductSelected(product: Product){
  this.productSelected.emit(product)
}
user$  = this.authService.user$ ;
searchKey:string = "";
selectedCategoryId = ""

  constructor(private cartService:CartService, private authService:AuthenticationService) { }

  ngOnInit(): void {

this.cartService.search.subscribe((val:any)=>{
  this.searchKey = val;
})
}

}
