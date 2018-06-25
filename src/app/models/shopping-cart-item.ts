import { Product } from './product';

export class ShoppingCartItem {
  $key: string;
  title: string;
  imageUrl: string;
  price: number;
  quantity: number;

  constructor( init?: Partial<ShoppingCartItem>) {
    Object.assign(this, init);
  }
 /* product: Product;
  quantity: number;

  constructor(product: Product, quantity: number) {
    this.product = product;
    this.quantity = quantity;
  }*/
  get totalPrice() {
    return this.price * this.quantity;
  }
}
