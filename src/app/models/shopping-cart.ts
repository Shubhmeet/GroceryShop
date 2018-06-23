import { ShoppingCartItem } from './shopping-cart-item';
import {number} from 'ng2-validation/dist/number';
import {Product} from "./product";

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(public itemsMap: { [productId: string]: ShoppingCartItem}) {
    for (const productId in itemsMap) {
      const item = this.itemsMap[productId];
      this.items.push(new ShoppingCartItem(item.product, item.quantity));
    }
  }



  get totalItemsCount() {
    let count = 0;
    for (const productId in this.itemsMap) {
      count += this.itemsMap[productId].quantity;
    }
    return count;
  }

  get totalPrice() {
    let price = 0;
    for (const productId in this.itemsMap) {
      price += this.itemsMap[productId].quantity * this.itemsMap[productId].product.price;
    }
    return price;
  }


  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }
}

