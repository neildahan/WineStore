import { Product } from "./product-interface";

export class CartItem {
    id?: number;
    productId: number;
    cartId: number;
    quantity: number;
    totalPrice: number;
    product?: Product;

    constructor(product: Product, cartId: number, quantity: number) {
        this.productId = product.id;
        this.cartId = cartId;
        this.quantity = quantity;
        this.totalPrice = product.price * this.quantity;
    }
}