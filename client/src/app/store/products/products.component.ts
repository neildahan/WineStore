import { Component, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs';
import { Product } from 'src/app/models/product-interface';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { EventEmitter } from '@angular/core';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

@Input() products?: Product[] | null;
@Output() productSelected = new EventEmitter<Product>()

onProductSelected(product: Product){
  this.productSelected.emit(product)
}

searchKey:string = "";
selectedCategoryId = ""


// filteredProducts$ = this.products$.pipe(
//   map((products :any )=>{
//     return products.filter(
//       (product:any) =>product.categoryId === this.selectedCategoryId
//     )
//   })
// )


  constructor() { }

  ngOnInit(): void {


}


// onCategorySelected(selectedCategoryId:any):void{
// this.productService.getProductsBySelectedCategory(selectedCategoryId).subscribe(data => {
//       this.productService.setProducts(data);
    
//     }
// )

// }
}
