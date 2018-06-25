import { ShoppingCartItem } from './shopping-cart-item';
import {number} from 'ng2-validation/dist/number';
import {Product} from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];
  constructor(private itemsMap: { [productId: string]: ShoppingCartItem}) {
    this.itemsMap = this.itemsMap || {};
    for (const productId in itemsMap) {
      const item = this.itemsMap[productId];
      const x = new ShoppingCartItem({
        ...item,
        $key: productId
      });

      this.items.push(x);
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
      price += this.itemsMap[productId].quantity * this.itemsMap[productId].price;
    }
    return price;
  }


  getQuantity(product: Product) {
    const item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }
}

