import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Product} from './models/product';
import 'rxjs/add/operator/take';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

   private create() {
    return this.db.list('/shopping-carts').push({
      dateCreated : new Date().getTime()
    });
  }
/*
   getOrCreateCart(product: Product) {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      this.create().then(result =>{
      localStorage.setItem('cartId', result.key);
      return this.getCart(result.key);
      });
    }else{
     return this.getCart(cartId);
    }

  }

* */

  /* cleaning the code, using async directive*/
  private async getOrCreateCartId() {
    const cartId = localStorage.getItem('cartId');
    if (!cartId) {
      const result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
    }
    return cartId;
  }

  private getCart(cartId: string) {
    this.db.object('/shopping-carts/' + cartId);
  }
  private getItem(cartId: string, productId: string) {
    return this.db.object('/shopping-carts/' + cartId + '/items/' + productId);
  }


  async addToCart(product: Product) {
    const cartId = await this.getOrCreateCartId();
    const item$ = this.getItem(cartId, product.$key);
    item$.take(1).subscribe(
      item => item$.update({quantity : (item.quantity || 0) + 1}));
  }
}
