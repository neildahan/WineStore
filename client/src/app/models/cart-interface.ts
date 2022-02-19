import { CartItem } from "./cart-item.interface";

export interface Cart {
    id: number,
    userId: number,
    products: CartItem[];

}