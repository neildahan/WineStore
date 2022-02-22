import { Product } from "./product-interface";



export class CartItem {
    id?: number;
    productId: number;
    cartId: number;
    quantity: number;
    totalPrice: number;
    product?: Product;
    name?: string;
    imgUrl?: string;
    categoryId?: number
    price?: number;
    
    constructor(product: Product, cartId: number, quantity: number) {
        this.name = product.name;
        this.productId = product.id;
        this.cartId = cartId;
        this.quantity = quantity;
        this.imgUrl = product.imgUrl;
        this.totalPrice = product.price * this.quantity;
    }
}